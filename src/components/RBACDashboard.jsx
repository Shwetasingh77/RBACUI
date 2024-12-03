import React, { useState } from 'react';
import { RBACProvider } from './RBACContext';
import RBACSidebar from './RBACSidebar';
import UserManagementHeader from './UserManagementHeader';
import UserTable from './UserTable';
import UserModal from './UserModal';
import RolesPage from './RolesPage';
import PermissionsPage from './PermissionsPage';

const RBACDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', role: 'Admin', accessLevel: 'Full' },
    { id: 2, name: 'Bob Williams', role: 'Editor', accessLevel: 'Limited' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
    } else {
      const newUser = {
        ...userData,
        id: users.length + 1,
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <>
            <UserManagementHeader
              onAddUser={handleAddUser}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <UserTable
              users={filteredUsers}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </>
        );
      case 'roles':
        return <RolesPage />;
      case 'permissions':
        return <PermissionsPage />;
      default:
        return <p className="p-4 text-gray-500">Select a section from the sidebar.</p>;
    }
  };

  return (
    <RBACProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <RBACSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Content */}
        <div className="flex-grow p-6 bg-gray-50">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {renderContent()}
          </div>
        </div>

        {/* User Modal */}
        {isModalOpen && (
          <UserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveUser}
          />
        )}
      </div>
    </RBACProvider>
  );
};

export default RBACDashboard;
