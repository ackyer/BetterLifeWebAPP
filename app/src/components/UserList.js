import React, { useState, useEffect } from 'react';

function UserList({ onUserDeleted }) {
    const [usuario, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/usuario')
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

    const handleDelete = (id_usuario) => {
        fetch(`http://localhost:3000/usuario/${id_usuario}`, { method: 'DELETE' })
            .then(() => {
                onUserDeleted(id_usuario); // Notify parent component to remove user from state
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ul>
            {usuario.map(usuario => (
                <li key={usuario.id_usuario}>
                    {usuario.nombre} - {usuario.email}
                    <button onClick={() => handleDelete(usuario.id_usuario)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
