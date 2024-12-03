import React, { useState } from 'react';
import { Shield, Plus, Edit2, Trash2 } from 'react-feather';
import { useRBAC } from './RBACContext';
import UseModal from './UserModal'; // Make sure to create this modal component

const RolesPage = () => {
  const { roles, permissions, addRole, updateRole, deleteRole } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleAddRole = () => {
    setSelectedRole(null); // Reset selected role
    setIsModalOpen(true); // Open modal
  };

  const handleEditRole = (role) => {
    setSelectedRole(role); // Set selected role for editing
    setIsModalOpen(true); // Open modal
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole(roleId); // Delete role using context function
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center">
          <Shield className="mr-3" /> Roles Management
        </h2>
        <button
          onClick={handleAddRole}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" /> Add Role
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Role Name</th>
              <th className="p-4 text-left">Permissions</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{role.name}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm) => {
                      const permDetail = permissions.find((p) => p.code === perm);
                      return (
                        <span
                          key={perm}
                          className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs"
                        >
                          {permDetail ? permDetail.description : perm}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="hover:bg-gray-200 p-2 rounded-full"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
                    className="hover:bg-red-100 p-2 rounded-full text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding or editing role */}
      {isModalOpen && (
        <UseModal
          role={selectedRole}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          // onSave={handleSaveRole} // Handle save logic here
        />
      )}
    </div>
  );
};

export default RolesPage;
