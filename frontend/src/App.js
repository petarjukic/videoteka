import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Users from "./users/Users";
import HomePage from "./home/HomePage";
import Logout from "./home/Logout";
import Admin from "./admin/Admin";
import AdminMovies from "./admin/AdminMovies";
import AddMovies from "./admin/AddMovies";
import Header from "./Header";
import AdminGenres from "./admin/AdminGenrea";
import SingleMovie from "./home/SingleMovie";

function App() {
    const [searchTerm, setSearchTerm] = useState("")

  
  return (
    <div className="App">
      <Router>
        <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/admin/movies" element={<AdminMovies />} />
          <Route path="/admin/movies/new" element={<AddMovies />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/genres" element={<AdminGenres />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
