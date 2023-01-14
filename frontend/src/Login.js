import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.firstName);
          localStorage.setItem("email", data.email);
          localStorage.setItem("role", data.Role.name);
          localStorage.setItem("isSubscribed", data.isSubscribed);
window.location.href = "/";
        } else {
          console.log("Authentication error");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="login-clean">
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <h2 className="sr-only">Login Form</h2>
          <div className="illustration">
            <i class="icon ion-ios-navigate"></i>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Log In
            </button>
          </div>
          <br></br>
          <Link to={"/register"}>Sign up</Link>
        </form>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default Login;
