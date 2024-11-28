import React, { useState, useEffect } from 'react';

function UserList({ onUserDeleted }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Runs once when the component mounts

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' })
            .then(() => {
                onUserDeleted(id); // Notify parent component to remove user from state
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name} - {user.email}
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
