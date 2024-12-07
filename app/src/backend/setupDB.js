const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('app.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.serialize(() => {

    db.run('PRAGMA foreign_keys = ON');

    db.run('DROP TABLE IF EXISTS PROYECTO_USUARIO');
    db.run('DROP TABLE IF EXISTS TAREA');
    db.run('DROP TABLE IF EXISTS META');
    db.run('DROP TABLE IF EXISTS ESPACIO');
    db.run('DROP TABLE IF EXISTS PROYECTO');
    db.run('DROP TABLE IF EXISTS USUARIO');

    db.run(`
        CREATE TABLE USUARIO (
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE PROYECTO (
            id_proyecto INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT
        )
    `);

    db.run(`
        CREATE TABLE ESPACIO (
            id_espacio INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            id_proyecto INT NOT NULL,
            FOREIGN KEY (id_proyecto) REFERENCES PROYECTO(id_proyecto)
        )
    `);

    db.run(`
        CREATE TABLE META (
            id_meta INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            fecha_limite DATE,
            id_espacio INT NOT NULL,
            FOREIGN KEY (id_espacio) REFERENCES ESPACIO(id_espacio)
        )
    `);

    db.run(`
        CREATE TABLE TAREA (
            id_tarea INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre VARCHAR(255) NOT NULL,
            descripcion TEXT,
            fecha_limite DATE,
            id_meta INT,
            id_espacio INT NOT NULL,
            id_usuario INT,
            prioridad TEXT CHECK(prioridad IN ('LOW', 'MEDIUM', 'HIGH')) NOT NULL,
            FOREIGN KEY (id_meta) REFERENCES META(id_meta),
            FOREIGN KEY (id_espacio) REFERENCES ESPACIO(id_espacio),
            FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        )
    `);

    db.run(`
        CREATE TABLE PROYECTO_USUARIO (
            id_proyecto INT NOT NULL,
            id_usuario INT NOT NULL,
            rol_usuario VARCHAR(50),
            PRIMARY KEY (id_proyecto, id_usuario),
            FOREIGN KEY (id_proyecto) REFERENCES PROYECTO(id_proyecto),
            FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
        )
    `);

    // Insert sample data
    db.run('INSERT INTO USUARIO (nombre, email) VALUES (?, ?)', ['Juan Pérez', 'juanperez@gmail.com']);
    db.run('INSERT INTO USUARIO (nombre, email) VALUES (?, ?)', ['María López', 'marialopez@yahoo.com']);
    db.run('INSERT INTO USUARIO (nombre, email) VALUES (?, ?)', ['Luis Gómez', 'luisgomezgamer@gmail.com']);

    db.run('INSERT INTO PROYECTO (nombre, descripcion) VALUES (?, ?)', ['Proyecto Alpha', 'Descripción del Proyecto Alpha']);
    db.run('INSERT INTO PROYECTO (nombre, descripcion) VALUES (?, ?)', ['Proyecto Beta', 'Descripción del Proyecto Beta']);

    db.run('INSERT INTO ESPACIO (nombre, descripcion, id_proyecto) VALUES (?, ?, ?)', ['Espacio Desarrollo', 'Espacio para desarrollo de funcionalidades', 1]);
    db.run('INSERT INTO ESPACIO (nombre, descripcion, id_proyecto) VALUES (?, ?, ?)', ['Espacio Diseño', 'Espacio para diseño gráfico', 1]);
    db.run('INSERT INTO ESPACIO (nombre, descripcion, id_proyecto) VALUES (?, ?, ?)', ['Espacio Testing', 'Espacio para pruebas y calidad', 2]);

    db.run('INSERT INTO META (nombre, descripcion, fecha_limite, id_espacio) VALUES (?, ?, ?, ?)', ['Meta 1', 'Completar el módulo de autenticación', '2024-12-15', 1]);
    db.run('INSERT INTO META (nombre, descripcion, fecha_limite, id_espacio) VALUES (?, ?, ?, ?)', ['Meta 2', 'Finalizar diseño de interfaz', '2024-12-20', 2]);

    db.run('INSERT INTO TAREA (nombre, descripcion, fecha_limite, id_meta, id_espacio, id_usuario, prioridad) VALUES (?, ?, ?, ?, ?, ?, ?)', ['Tarea 1', 'Implementar registro de usuarios', '2024-11-30', 1, 1, 1, 'HIGH']);
    db.run('INSERT INTO TAREA (nombre, descripcion, fecha_limite, id_meta, id_espacio, id_usuario, prioridad) VALUES (?, ?, ?, ?, ?, ?, ?)', ['Tarea 2', 'Diseñar logo', '2024-12-05', 2, 2, 2, 'MEDIUM']);
    db.run('INSERT INTO TAREA (nombre, descripcion, fecha_limite, id_meta, id_espacio, id_usuario, prioridad) VALUES (?, ?, ?, ?, ?, ?, ?)', ['Tarea 3', 'Pruebas de integración', '2024-12-10', null, 3, 3, 'LOW']);

    db.run('INSERT INTO PROYECTO_USUARIO (id_proyecto, id_usuario, rol_usuario) VALUES (?, ?, ?)', [1, 1, 'Administrador']);
    db.run('INSERT INTO PROYECTO_USUARIO (id_proyecto, id_usuario, rol_usuario) VALUES (?, ?, ?)', [1, 2, 'Diseñador']);
    db.run('INSERT INTO PROYECTO_USUARIO (id_proyecto, id_usuario, rol_usuario) VALUES (?, ?, ?)', [2, 3, 'Tester']);

    console.log('Database setup complete.');
});

db.close();
