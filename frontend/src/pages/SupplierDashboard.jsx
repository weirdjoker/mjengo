
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import OrderList from '../components/OrderList';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const SupplierDashboard = () => {
  const [role] = useState(JSON.parse(localStorage.getItem('user'))?.role || 'supplier');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <SearchBar />
        <Notifications />
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/orders/:projectId" element={<OrderList />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/create-item" element={<ItemForm />} />
          <Route path="/inventory" element={<div>Inventory (TBD)</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default SupplierDashboard;