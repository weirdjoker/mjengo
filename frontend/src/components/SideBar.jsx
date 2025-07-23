import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Projects', to: '/owner-dashboard' },
  { label: 'Notifications', to: '/owner-dashboard/notifications' },
  { label: 'Chat', to: '/owner-dashboard/chat' },
  { label: 'Builders', to: '/owner-dashboard/builders' },
  { label: 'Supplier', to: '/owner-dashboard/supplier' },
];

const SideBar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={`bg-gray-800 text-white min-h-screen transition-all duration-300 ${isOpen ? 'w-56' : 'w-16'} flex flex-col`}>
      <button
        className="p-4 focus:outline-none"
        onClick={toggleSidebar}
        title={isOpen ? 'Close menu' : 'Open menu'}
      >
        ☰
      </button>
      {isOpen && (
        <nav className="mt-4 flex-1">
          <ul>
            {menuItems.map(item => (
              <li key={item.label} className="mb-4">
                <Link to={item.to} className="hover:underline">{item.label}</Link>
              </li>
            ))}
            <li className="mt-8">
              <button
                className="w-full text-left bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SideBar;