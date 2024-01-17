const User = require("../usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    //console.log(token);

    if (!token) {
      //console.log("No token provided");
      res.status(401).send("Unauthorized: No valid token provided");
    }

    const formattedToken = token.replace("Bearer ", "");
    //console.log("Received Token:", formattedToken);

    const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET_KEY);
    //console.log("Decoded Token:", decoded);

    const user = await User.findOne({ _id: decoded.userId });
    //console.log(user);

    if (!user) {
      // console.log("No user found");
      res.status(400).send("No authenticated user found");
    }

    req.user = user;
    req.token = formattedToken;
    return next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res
      .status(401)
      .send({ msg: "Please authenticate again", errMsg: error.message });
  }
};

module.exports = authenticate;
