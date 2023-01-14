import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:4000/api/movies");
      const data = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div id="shell">
        <div id="container">
          <div className="row w-100">
          {movies.map((movie) => (
<div className="col-2">
            <div className="box">
              <div className="head"></div>
              <div className="movie">
                <div className="movie-image">
                  {" "}
                  <span className="play">
                    <span className="name">{movie.name}</span>
                  </span>{" "}
                  <Link to={`/movie/${movie.id}`}>
                    <img alt="" src={movie.image} />
                  </Link>
                </div>
              </div>
              </div>
</div>
          ))}
          </div>
        </div>
      </div>
  );
};

export default HomePage;
