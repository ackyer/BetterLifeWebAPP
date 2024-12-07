import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {
  const [usuario, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const handleUserDeleted = (id_usuario) => {
    setUsers(prevUsers => prevUsers.filter(usuario => usuario.id_usuario !== id_usuario));
  };

  return (
      <div>
        <h1>User Management System</h1>
        <AddUser onUserAdded={handleUserAdded} />
        <UserList usuario={usuario} onUserDeleted={handleUserDeleted} />
      </div>
  );
}

export default App;
