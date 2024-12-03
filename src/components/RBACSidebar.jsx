import React from 'react';
import { 
  Users, 
  Shield, 
  Key, 
  Menu, 
  ChevronsRight 
} from 'lucide-react';

const RBACSidebar = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  activeSection, 
  setActiveSection 
}) => {
  const sidebarItems = [
    { icon: Users, label: 'Users', section: 'users' },
    { icon: Shield, label: 'Roles', section: 'roles' },
    { icon: Key, label: 'Permissions', section: 'permissions' }
  ];

  return (
    <div className={`
      ${isSidebarOpen ? 'w-64' : 'w-20'} 
      bg-gradient-to-br from-indigo-800 to-purple-900 
      text-white transition-all duration-300 ease-in-out relative
    `}>
      <div className="flex items-center justify-between p-4">
        {isSidebarOpen ? (
          <h1 className="text-2xl font-bold">RBAC Pro</h1>
        ) : (
          <button 
            onClick={toggleSidebar}
            className="hover:bg-indigo-700 p-2 rounded-full mx-auto"
          >
            <ChevronsRight />
          </button>
        )}
        
        {isSidebarOpen && (
          <button 
            onClick={toggleSidebar}
            className="hover:bg-indigo-700 p-2 rounded-full"
          >
            <Menu />
          </button>
        )}
      </div>
      
      <nav className="mt-10 space-y-2">
        {sidebarItems.map((item) => (
          <div 
            key={item.label}
            onClick={() => setActiveSection(item.section)}
            className={`
              flex items-center p-3 cursor-pointer
              ${activeSection === item.section ? 'bg-indigo-700' : 'hover:bg-indigo-600'}
              transition-colors duration-200
              ${!isSidebarOpen ? 'justify-center' : ''}
            `}
          >
            <item.icon className={isSidebarOpen ? 'mr-3' : ''} />
            {isSidebarOpen && <span>{item.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default RBACSidebar;