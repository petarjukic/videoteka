import React, { useEffect, useState } from "react";

const AdminGenres = () => {
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  const addGenre = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/genres", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: genre }),
    });
    const data = await response.json();
    if (data) {
      window.location.reload();
    }
  };
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch("http://localhost:4000/api/genres");
      const data = await response.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const deleteGenre = async (e, genre) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/genres/${genre.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      window.location.reload();
    }
  };

  return (
    <>
      <div class="container">
        <h1>Admin Genres</h1>
        <div class="row">
          <div className="col">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genre) => (
                  <tr key={genre.id}>
                    <td>{genre.name}<button className="btn btn-danger btn-sm" onClick={(e) => deleteGenre(e, genre)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col">
            <h2>Add Genre</h2>
            <form onSubmit={addGenre}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={genre}
                  className="form-control"
                  onChange={(e) => setGenre(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminGenres;
