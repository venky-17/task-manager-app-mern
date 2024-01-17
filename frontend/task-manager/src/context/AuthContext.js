import React, { useState } from "react";

import { createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const resultValues = {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
  };

  return (
    <AuthContext.Provider value={resultValues}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
