import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const UserTable = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-100">
        <tr>
          {['Name', 'Role', 'Access Level', 'Actions'].map((header) => (
            <th key={header} className="p-4 text-left text-gray-600">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
            <td className="p-4">{user.name}</td>
            <td className="p-4">
              <span className={`
                px-3 py-1 rounded-full text-xs
                ${user.role === 'Admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
              `}>
                {user.role}
              </span>
            </td>
            <td className="p-4">
              <span className={`
                px-3 py-1 rounded-full text-xs
                ${user.accessLevel === 'Full' ? 'bg-indigo-100 text-indigo-800' : 'bg-yellow-100 text-yellow-800'}
              `}>
                {user.accessLevel}
              </span>
            </td>
            <td className="p-4 flex space-x-2">
              <button 
                onClick={() => onEditUser(user)}
                className="hover:bg-gray-200 p-2 rounded-full"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => onDeleteUser(user.id)}
                className="hover:bg-red-100 p-2 rounded-full text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;