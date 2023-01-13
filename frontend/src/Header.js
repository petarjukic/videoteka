import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const isSubscribed = localStorage.getItem("isSubscribed");

    setUser({
      name: name,
      email: email,
      role: role,
      isSubscribed: isSubscribed,
    });
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
      id="header"
    >
      <h1 id="logo">
        <a href="#">MovieHunter</a>
      </h1>
      <div id="navigation">
        <ul>
          <li>
            <Link to="/" className="active">
              HOME
            </Link>
          </li>
          {user.name ? (
            <Link to={"/logout"}>
              <li>
                <a>Logout</a>
              </li>
            </Link>
          ) : (
            <>
              <Link to={"/login"}>
                <li>
                  <a>Login</a>
                </li>
              </Link>
              <Link to={"/register"}>
                <li>
                  <a>Register</a>
                </li>
              </Link>
            </>
          )}
          {user.role === "admin" && (
            <Link to={"/admin"}>
              <li>
                <a>Admin</a>
              </li>
            </Link>
          )}
        </ul>
      </div>
      <div id="sub-navigation">
        <ul>
          <li>
            <a>SHOW ALL</a>
          </li>
          <li>
            <a>LATEST TRAILERS</a>
          </li>
          <li>
            <a>TOP RATED</a>
          </li>
          <li>
            <a>MOST COMMENTED</a>
          </li>
        </ul>
        <div id="search">
          <form action="#" method="get" accept-charset="utf-8">
            <label for="search-field">SEARCH</label>
            <input
              type="text"
              name="search field"
              placeholder="Enter search here"
              id="search-field"
              className="blink search-field"
            />
            <input type="submit" value="Go" class="search-button" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
