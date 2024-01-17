import React from "react";
import { Link } from "react-router-dom";
import "./css/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="HomePage">
        <div className="links-container">
          <Link to="/signup" className="link">
            Sign Up
          </Link>
          <Link to="/login" className="link">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
