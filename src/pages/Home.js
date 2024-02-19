import { useState, useEffect } from "react";
import Http from "./Http";
import { Link } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        Http.get('/users').then(res => {
            setUsers(res.data);
        })
    }

    const deleteUser = (id) => {
        Http.delete('/users/' + id).then(res => {
            fetchAllUsers();
        })
    }

    return (
        <div>
            <h2>Users Listing...</h2>
            <table className="table">
                <thead>
                    <tr>
                        <td>Sno.</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <Link className="btn btn-info btn-space" to={{ pathname: "/edit/" + user.id }}>Edit</Link>
                                    <Link className="btn btn-primary mr-1" to={{ pathname: "/view/" + user.id }}>View</Link>
                                    <button type="button" className="btn btn-danger"
                                        onClick={() => { deleteUser(user.id) }}
                                    >Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}