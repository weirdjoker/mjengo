import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import ProjectForm from '../components/ProjectForm';
import Header from '../components/Header'; // Add this import

const OwnerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProject = (project) => {
    setProjects([project, ...projects]);
  };

  // Only show first 3 projects unless "See More" is clicked
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header /> {/* Add Header at the top */}
      <div className="flex flex-1">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="flex-1 px-6 py-8 md:px-12 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">
              Welcome, {user.name ? user.name : 'Owner'}!
            </h1>
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <span className="text-xl font-bold">+</span> Add Project
            </button>
          </div>
          {showAddForm && (
            <ProjectForm onAdd={handleAddProject} onClose={() => setShowAddForm(false)} />
          )}
          <SearchBar />
          <Notifications />

          <h2 className="text-xl font-bold mb-4 mt-6">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {displayedProjects.map(project => (
              <div key={project.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                <img src={project.image} alt={project.name} className="w-32 h-32 object-cover rounded mb-2" />
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="mt-2 text-xs">Status: {project.status}</div>
                <div className="mt-2 text-xs">Cost: {project.cost}</div>
                <div className="mt-2 text-xs">Timeline: {project.timeline}</div>
                <div className="mt-2 text-xs">Builder: {project.builder}</div>
                <div className="mt-2 w-full">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-xs">{project.progress}% Complete</span>
                </div>
              </div>
            ))}
          </div>
          {projects.length > 3 && !showAll && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowAll(true)}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;