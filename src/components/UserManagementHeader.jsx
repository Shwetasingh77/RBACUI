import React from 'react';
import { Plus, Search } from 'lucide-react';

const UserManagementHeader = ({ onAddUser, searchQuery, setSearchQuery }) => {
    return (
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-bold text-white">User Management</h2>
          <button
            onClick={onAddUser}
            className="bg-white/20 text-white p-2 rounded-full hover:bg-white/30"
          >
            <Plus />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Search className="absolute left-3 top-3 text-white/70" />
        </div>
      </div>
    );
  };
  

export default UserManagementHeader;