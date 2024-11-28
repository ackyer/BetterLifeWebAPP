import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const handleUserDeleted = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return (
      <div>
        <h1>User Management System</h1>
        <AddUser onUserAdded={handleUserAdded} />
        <UserList users={users} onUserDeleted={handleUserDeleted} />
      </div>
  );
}

export default App;
