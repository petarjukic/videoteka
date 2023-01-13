import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Link to="/admin/users" className="btn btn-primary">
        Users
      </Link>
      <Link className="btn btn-primary" to="/admin/movies">
        Movies
      </Link>
      <Link className="btn btn-primary" to="/admin/genres">
        Genres
      </Link>
    </div>
  );
};

export default Admin;
