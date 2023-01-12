import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import Users from "./users/Users";
import HomePage from "./home/HomePage";
import Logout from "./home/Logout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
