import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,

    setAuthenticated,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const url = "https://task-manager-efrr.onrender.com/signup";

    try {
      const response = await axios.post(url, {
        username,
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/tasks");
      toast.success("Signup Successful");
      setAuthenticated(true);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error?.response?.data?.error);
    }
  };

  const handleTestAccount = (e) => {
    e.preventDefault();
    navigate("/login");
    setEmail("test@gmail.com");
    setPassword("1234567");
  };

  return (
    <div className="mainForm">
      <form method="POST" onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Enter Name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <input
            type="password"
            id="password"
            placeholder="Min 7 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="loginBtn">
          Sign Up
        </button>
        <p className="authOption">
          <Link to="/login" className="noUnderline">
            SignIn Here
          </Link>
        </p>
        <button className="testAccBtn" onClick={handleTestAccount}>
          Test Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
