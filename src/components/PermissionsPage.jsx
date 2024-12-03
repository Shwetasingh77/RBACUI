import React, { useState, useEffect } from 'react';
import { useRBAC } from './RBACContext'; // Assuming RBAC context is correctly set up
import { Key, Plus, Edit2, Trash2 } from 'lucide-react';
import PermissionModal from './PermissionModal'; // Create this modal component to handle Add/Edit

const PermissionsPage = () => {
  const { permissions, addPermission, updatePermission, deletePermission } = useRBAC();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);

  // Handles adding a new permission
  const handleAddPermission = () => {
    setSelectedPermission(null); // No permission selected for new entry
    setIsModalOpen(true); // Open the modal
  };

  // Handles editing an existing permission
  const handleEditPermission = (permission) => {
    setSelectedPermission(permission); // Set selected permission for editing
    setIsModalOpen(true); // Open the modal
  };

  // Handles deleting a permission
  const handleDeletePermission = (permissionId) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      deletePermission(permissionId); // Call delete function from context
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center">
          <Key className="mr-3" /> Permissions Management
        </h2>
        {/* Add Permission Button */}
        <button 
          onClick={handleAddPermission}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus className="mr-2" /> Add Permission
        </button>
      </div>

      {/* Permissions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Permission Code</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {permission.code}
                  </span>
                </td>
                <td className="p-4">{permission.description}</td>
                <td className="p-4 flex space-x-2">
                  {/* Edit Button */}
                  <button 
                    onClick={() => handleEditPermission(permission)}
                    className="hover:bg-gray-200 p-2 rounded-full"
                  >
                    <Edit2 size={18} />
                  </button>
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeletePermission(permission.id)}
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

      {/* Modal for adding or editing a permission */}
      {isModalOpen && (
        <PermissionModal
          permission={selectedPermission}  // Pass selected permission data for editing or empty for new
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}  // Close the modal
          onSave={selectedPermission ? updatePermission : addPermission} // Conditional save based on edit or add
        />
      )}
    </div>
  );
};

export default PermissionsPage;
