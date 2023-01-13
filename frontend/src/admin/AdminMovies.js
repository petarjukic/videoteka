import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

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
    fetchMovies();
    fetchGenres();
  }, []);

  const deleteMovie = async (id) => {
    const response = await fetch(`http://localhost:4000/api/movies/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <div>
      <h1>Admin Movies</h1>
      <Link to="/admin/movies/new">
        <button className="btn btn-primary">Add Movie</button>
      </Link>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.Genre.name}</td>
              <td>{movie.year}</td>
              <td>{movie.Director.name}</td>
              <td>
                <Link to={`/admin/movies/${movie.id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMovies;
