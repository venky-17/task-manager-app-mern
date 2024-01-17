import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { email, setEmail, username, setUsername, password, setPassword } =
    useContext(AuthContext);
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
      navigate("/tasks");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
      </form>
    </div>
  );
};

export default SignUp;
