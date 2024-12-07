import React, { useState } from 'react';

function AddUser({ onUserAdded }) {
    const [nombre, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email }),
        })
            .then(response => response.json())
            .then(newUser => {
                onUserAdded(newUser); // Notify parent to update user list
                setName('');
                setEmail('');
            })
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={nombre}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Add User</button>
        </form>
    );
}

export default AddUser;
