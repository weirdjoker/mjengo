// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar, role }) => {
  const navigate = useNavigate();

  const menuItems = {
    owner: [
      { text: 'Projects', path: '/owner-dashboard' },
      { text: 'Tasks', path: '/owner-dashboard/tasks/:projectId' },
      { text: 'Orders', path: '/owner-dashboard/orders/:projectId' },
      { text: 'Inventory', path: '/owner-dashboard/inventory' },
    ],
    builder: [
      { text: 'Assigned Projects', path: '/builder-dashboard' },
      { text: 'Tasks', path: '/builder-dashboard/tasks/:projectId' },
      { text: 'Progress Updates', path: '/builder-dashboard/progress' },
    ],
    supplier: [
      { text: 'Orders', path: '/supplier-dashboard' },
      { text: 'Items', path: '/supplier-dashboard/items' },
      { text: 'Inventory', path: '/supplier-dashboard/inventory' },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 md:translate-x-0 z-50`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">Mjengo App</h2>
        <h3 className="text-sm capitalize">{role} Dashboard</h3>
      </div>
      <nav className="mt-4">
        {menuItems[role].map((item) => (
          <Link
            key={item.text}
            to={item.path}
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={() => toggleSidebar && toggleSidebar()} // Ensure toggleSidebar is called only if defined
          >
            {item.text}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="w-full text-left py-2 px-4 mt-4 hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;