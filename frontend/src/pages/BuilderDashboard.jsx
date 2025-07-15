
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import ProjectList from '../components/ProjectList';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import TaskList from '../components/TaskList';

const BuilderDashboard = () => {
  const [role] = useState(JSON.parse(localStorage.getItem('user'))?.role || 'builder');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 p-6">
        <SearchBar />
        <Notifications />
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/tasks/:projectId" element={<TaskList />} />
          <Route path="/progress" element={<div>Progress Updates (TBD)</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default BuilderDashboard;