import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Header = ({ setSearchTerm, searchTerm}) => {
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
      isSubscribed: isSubscribed === "true" ? true : false,
    });
  }, []);

  const subscribe = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/users/" + user.email, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("isSubscribed", true);
        setUser({ ...user, isSubscribed: true });
      }
    );
  };
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
      }}
      id="header"
    >


      <div id="navigation">
        <ul>
      {(user.isSubscribed === true && user.name !== undefined) && (
            <li>{user.name} is subscribed</li>
          )}
          {(user.isSubscribed === false && user.name !==  null) && (
          <li><button className="btn btn-danger" onClick={subscribe}>Subscribe</button></li>
)}
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

        </ul>
        <div id="search">
          <form action="#" method="get" accept-charset="utf-8">
            <label for="search-field">SEARCH</label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              name="search field"
              placeholder="Enter search here"
              id="search-field"
              className="blink search-field"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
