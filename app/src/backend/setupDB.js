const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('app.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.serialize(() => {
    // Create the users table if it doesn't exist
    db.run(`
        DROP TABLE IF EXISTS PROYECTO_USUARIO;
        DROP TABLE IF EXISTS TAREA;
        DROP TABLE IF EXISTS META;
        DROP TABLE IF EXISTS ESPACIO;
        DROP TABLE IF EXISTS PROYECTO;
        DROP TABLE IF EXISTS USUARIO;
        
        CREATE TABLE USUARIO (
            id_usuario INT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL
        );
        
        CREATE TABLE PROYECTO (
            id_proyecto INT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT
        );
        
        CREATE TABLE ESPACIO (
            id_espacio INT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            id_proyecto INT NOT NULL,
            FOREIGN KEY (id_proyecto) REFERENCES PROYECTO(id_proyecto)
        );
        
        CREATE TABLE META (
            id_meta INT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            fecha_limite DATE,
            id_espacio INT NOT NULL,
            FOREIGN KEY (id_espacio) REFERENCES ESPACIO(id_espacio)
        );
        
        CREATE TABLE TAREA (
            id_tarea INT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            fecha_limite DATE,
            id_meta INT,
            id_espacio INT NOT NULL,
            id_usuario INT,
            prioridad ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
            FOREIGN KEY (id_meta) REFERENCES META(id_meta),
            FOREIGN KEY (id_espacio) REFERENCES ESPACIO(id_espacio),
            FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        );
        
        CREATE TABLE PROYECTO_USUARIO (
            id_proyecto INT NOT NULL,
            id_usuario INT NOT NULL,
            rol_usuario VARCHAR(50),
            PRIMARY KEY (id_proyecto, id_usuario),
            FOREIGN KEY (id_proyecto) REFERENCES PROYECTO(id_proyecto),
            FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        );
    `);

    // Insert sample data
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['John Doe', 'john@example.com']);
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', ['Jane Smith', 'jane@example.com']);

    console.log('Database setup complete.');
});

db.close();
