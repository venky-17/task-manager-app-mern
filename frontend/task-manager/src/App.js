import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tasks from "./components/Tasks";
import SignUp from "./auth/Signup";
import Login from "./auth/Login";
import HomePage from "./components/HomePage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={<HomePage />}>
              {" "}
            </Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
