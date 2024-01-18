import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import "../components/css/Login.css";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,

    setAuthenticated,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "https://task-manager-efrr.onrender.com/login";

    try {
      let response = await axios.post(url, {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuthenticated(true);
        navigate("/tasks");
        toast.success("Login Sucessful ");

        console.log(response.data.token);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="mainForm">
        <div className="loginForm">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="loginBtn">
              Login
            </button>
            <p className="authOption">
              <Link to="/signup" className="noUnderline">
                SignUp Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
