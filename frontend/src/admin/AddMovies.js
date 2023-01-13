import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddMovies = () => {
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    director: "",
    video: "",
    image: "",
    oscar: false,
  });
  const [genres, setGenres] = useState([]);
  const [dropdown, setDropdown] = useState(
    "162e4ddf-158b-4bdc-9260-edae8d39e9a5"
  );

  const addMovie = async (e) => {
    e.preventDefault();

    const newMovie = {
      ...movie,
      director: {
        name: movie.director,
      },
      genre: dropdown,
    };
    const response = await fetch("http://localhost:4000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:4000/api/genres");
      const data = await response.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      return setMovie({ ...movie, [e.target.name]: e.target.checked });
    }
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  console.log(movie);
  return (
    <>
      <h1>Add movie</h1>
      <Link to="/admin/movies">Go back</Link>
      <form
        onSubmit={addMovie}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <input
          type="text"
          value={movie.name}
          placeholder="Title"
          onChange={handleChange}
          name="name"
        />
        <input
          type="text"
          value={movie.video}
          placeholder="Video"
          onChange={handleChange}
          name="video"
        />
        <input
          type="text"
          placeholder="Image"
          onChange={handleChange}
          name="image"
          value={movie.image}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={movie.description}
        />
        <input
          type="text"
          placeholder="Director"
          onChange={handleChange}
          name="director"
          value={movie.director}
        />
        <input
          type="checkbox"
          placeholder="Oscar"
          onChange={handleChange}
          name="oscar"
          checked={movie.oscar}
        />
        <input
          type="number"
          placeholder="Year"
          value={movie.year}
          onChange={handleChange}
          name="year"
        />
        <select value={dropdown} onChange={(e) => setDropdown(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <button type="submit" onClick={addMovie}>
          Add
        </button>
      </form>
    </>
  );
};

export default AddMovies;
