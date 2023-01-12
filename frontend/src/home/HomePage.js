import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
    <div id="shell">
      <div id="header">
        <h1 id="logo">
          <a href="#">MovieHunter</a>
        </h1>
        <div id="navigation">
          <ul>
            <li>
              <a className="active">HOME</a>
            </li>
            {user.name ? (
              <Link to={"/logout"}>
                <li>
                  <a>Logout</a>
                </li>
              </Link>
            ) : (
              <Link to={"/login"}>
                <li>
                  <a>Login</a>
                </li>
              </Link>
            )}
            <Link to={"/register"}>
              <li>
                <a>Register</a>
              </li>
            </Link>
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
      <div id="main">
        <div id="content">
          <div className="box">
            <div className="head"></div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">X-MAN</span>
                </span>{" "}
                <a href="#">
                  <img alt="" />
                </a>{" "}
              </div>
            </div>
            <div class="movie">
              <div class="movie-image">
                {" "}
                <span className="play">
                  <span className="name">SPIDER MAN 2</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie2.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">SPIDER MAN 3</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie3.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">VALKYRIE</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie4.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">GLADIATOR</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie5.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie last">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">ICE AGE</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie6.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="cl">&nbsp;</div>
          </div>
          <div className="box">
            <div className="head"></div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">TRANSFORMERS</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie7.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span class="play">
                  <span class="name">MAGNETO</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie8.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">KUNG FU PANDA</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie9.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">EAGLE EYE</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie10.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">NARNIA</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie11.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="movie last">
              <div className="movie-image">
                {" "}
                <span className="play">
                  <span className="name">ANGELS &amp; DEMONS</span>
                </span>{" "}
                <a href="#">
                  <img src="css/images/movie12.jpg" alt="" />
                </a>{" "}
              </div>
            </div>
            <div className="cl">&nbsp;</div>
          </div>
        </div>
        <div className="cl">&nbsp;</div>
      </div>
    </div>
  );
};

export default HomePage;
