
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

const OwnerDashboard = () => {
  const [role] = useState(JSON.parse(localStorage.getItem('user'))?.role || 'owner');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <SearchBar />
        <Notifications />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/tasks/:projectId" element={<TaskList />} />
          <Route path="/create-task/:projectId" element={<TaskForm />} />
          <Route path="/orders/:projectId" element={<OrderList />} />
          <Route path="/create-order/:projectId" element={<OrderForm />} />
          <Route path="/inventory" element={<div>Inventory (TBD)</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default OwnerDashboard;