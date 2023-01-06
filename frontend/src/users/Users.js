import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/users")
        .then((response) => response.json()).then((allUsers) => {
            setUsers(allUsers);
        })
    }, []);

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => 
                        <tr key={user.firstName}>
                            <td className="name">{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{}true/flase</td>
                            <td>
                                <Link to={"/" }>
                                    <button>Home</button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Users;