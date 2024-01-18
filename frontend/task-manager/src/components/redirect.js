import React from "react";
import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <>
      <Link
        to="/login"
        style={{
          color: "white",
          fontSize: "3rem",
        }}
      >
        Please Authenticate to continue
      </Link>
    </>
  );
};

export default Redirect;
