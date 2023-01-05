import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { useState } from "react";
import Login from './Login';
import Register from './Register';
import { UserContext } from './UserContext';


function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:", { //TODO FALI PATH ZA BACKEND
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then((resp)=>resp.json())
    .then((data) => {
        if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);
            setUser(email);
        } else {
            console.log("Authentication error");
        }
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
