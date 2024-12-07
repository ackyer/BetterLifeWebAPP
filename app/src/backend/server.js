const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to SQLite database
const db = new sqlite3.Database('app.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// API Endpoints

// Fetch all users
app.get('/usuario', (req, res) => {
    db.all('SELECT * FROM usuario', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new user
app.post('/usuario', (req, res) => {
    const { nombre, email } = req.body;
    db.run('INSERT INTO usuario (nombre, email) VALUES (?, ?)', [nombre, email], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id_usuario: this.lastID, nombre, email });
        }
    });
});

// Update a user
app.put('/usuario/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, email } = req.body;
    db.run('UPDATE usuario SET nombre = ?, email = ? WHERE id_usuario = ?', [nombre, email, id_usuario], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ id_usuario, nombre, email });
        }
    });
});

// Delete a user
app.delete('/usuario/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(204).send(); // No content
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
