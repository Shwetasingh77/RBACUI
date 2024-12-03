// RBACContext.jsx
import React, { createContext, useContext, useState } from 'react';

const RBACContext = createContext();

export const useRBAC = () => useContext(RBACContext);

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([
    { id: 1, code: 'READ', description: 'Read Access' },
    { id: 2, code: 'WRITE', description: 'Write Access' },
    { id: 3, code: 'DELETE', description: 'Delete Access' },
  ]);

  // User operations
  const addUser = (user) => setUsers([...users, user]);
  const updateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };
  const deleteUser = (userId) => setUsers(users.filter((user) => user.id !== userId));

  // Role operations
  const addRole = (role) => setRoles([...roles, role]);
  const updateRole = (updatedRole) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  };
  const deleteRole = (roleId) => setRoles(roles.filter((role) => role.id !== roleId));

  // Permission operations
  const addPermission = (permission) => setPermissions([...permissions, permission]);
  const updatePermission = (updatedPermission) => {
    setPermissions(permissions.map((perm) => (perm.id === updatedPermission.id ? updatedPermission : perm)));
  };

  return (
    <RBACContext.Provider
      value={{
        users,
        roles,
        permissions,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
        addPermission,
        updatePermission,
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};
