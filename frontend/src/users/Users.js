import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((response) => response.json())
      .then((allUsers) => {
        setUsers(allUsers);
      });
  }, []);

  const subscribe = async (e, user) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/users/${user}`, {
      method: "PUT",
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
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Subscribed</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.firstName}>
                <td className="name">{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.isSubscribed === true ? "True" : "False"}{user.isSubscribed === false && (<button onClick={e => subscribe(e, user.email) } className="btn btn-danger btn-sm">Subscribe</button>)}</td>
                <td>{user.Role.name}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
