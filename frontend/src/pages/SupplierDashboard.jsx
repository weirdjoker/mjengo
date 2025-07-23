import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import OrderList from '../components/OrderList';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const SupplierDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [supplies, setSupplies] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Only show first 3 supplies unless "See More" is clicked
  const displayedSupplies = showAll ? supplies : supplies.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 px-6 py-8 md:px-12 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Welcome, {user.name ? user.name : 'Supplier'}!
            </h1>
          </div>
          <SearchBar />
          <Notifications />

          <h2 className="text-xl font-bold mb-4 mt-6">Your Supplies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {displayedSupplies.map(supply => (
              <div key={supply.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                <img src={supply.image} alt={supply.name} className="w-32 h-32 object-cover rounded mb-2" />
                <h3 className="font-bold">{supply.name}</h3>
                <p className="text-sm text-gray-600">{supply.description}</p>
                <div className="mt-2 text-xs">Status: {supply.status}</div>
                <div className="mt-2 text-xs">Cost: {supply.cost}</div>
                <div className="mt-2 text-xs">Timeline: {supply.timeline}</div>
                <div className="mt-2 text-xs">Buyer: {supply.buyer}</div>
                <div className="mt-2 w-full">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${supply.progress}%` }}></div>
                  </div>
                  <span className="text-xs">{supply.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
          {supplies.length > 3 && !showAll && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowAll(true)}
            >
              See More
            </button>
          )}
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/orders/:projectId" element={<OrderList />} />
            <Route path="/items" element={<ItemList />} />
            <Route path="/create-item" element={<ItemForm />} />
            <Route path="/inventory" element={<div>Inventory (TBD)</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;