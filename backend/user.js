const express = require("express");
const User = require("./usersModel");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      message: "User registered successfully",
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: " Internal server error Maybe Enter Valid Email and Password",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide Both Username and Password" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    const validCreds = await bcrypt.compare(password, user.password);
    if (validCreds) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({ token, message: "logged In" });
    } else {
      return res.status(401).json({ message: "Wrong Password" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
});

// router.post("/logout", async (req, res) => {
//   try {
//     await localStorage.removeItem(req.user.token);
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// });

module.exports = router;
