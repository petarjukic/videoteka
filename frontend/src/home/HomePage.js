import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([])
  const [genres, setGenres] = useState([]);
  const [dropdown, setDropdown] = useState("");
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:4000/api/movies");
      const data = await response.json();
      setMovies(data);
    };

    const fetchGenres = async () => {
      const response = await fetch("http://localhost:4000/api/genres");
      const data = await response.json();
      setGenres(data);
    };
    fetchGenres();
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setNewMovies(movies);
      return;
    }
    const newMovies = movies.filter((movie) => {
      return movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    );
    setNewMovies(newMovies);
  }, [movies, searchTerm]);

  useEffect(() => {
    if (dropdown === "Asc") {
      const newMovies = movies.sort((a, b) => {
        return a.year - b.year;
      });
      setNewMovies(newMovies);
    } else {
      const newMovies = movies.sort((a, b) => {
        return b.year - a.year;
      });
      setNewMovies(newMovies);
    }
  }, [dropdown, movies]);

  return (
    <div id="shell">
        <div id="container d-flex">
        <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
          <option>Sort by year</option>
            <option value="Asc">
ASC
            </option>
            <option value="Desc">DESC</option>
        </select>
          <div className="row w-100">
          {newMovies.map((movie) => (
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
