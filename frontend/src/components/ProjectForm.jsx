import React, { useState } from 'react';

const buildersList = [
  { username: 'builder1', name: 'Builder 1' },
  { username: 'builder2', name: 'Builder 2' },
];

const ProjectForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    status: 'ongoing',
    cost: '',
    timeline: '',
    builder: '',
    progress: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    setFormData({
      name: '',
      description: '',
      image: '',
      status: 'ongoing',
      cost: '',
      timeline: '',
      builder: '',
      progress: 0,
    });
    onClose();
  };

  return (
    <form className="mb-6 bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-2">Add Project</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" className="border p-2 w-full rounded mb-2" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full rounded mb-2" required />
      <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2 w-full rounded mb-2" required />
      <select name="status" value={formData.status} onChange={handleChange} className="border p-2 w-full rounded mb-2" required>
        <option value="ongoing">Ongoing</option>
        <option value="done">Done</option>
        <option value="paused">Paused</option>
      </select>
      <input type="number" name="cost" value={formData.cost} onChange={handleChange} placeholder="Cost Estimate" className="border p-2 w-full rounded mb-2" required />
      <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline" className="border p-2 w-full rounded mb-2" required />
      <select name="builder" value={formData.builder} onChange={handleChange} className="border p-2 w-full rounded mb-2" required>
        <option value="">Select Builder</option>
        {buildersList.map(b => (
          <option key={b.username} value={b.username}>{b.name} ({b.username})</option>
        ))}
      </select>
      <input type="number" name="progress" value={formData.progress} onChange={handleChange} placeholder="Progress (%)" min="0" max="100" className="border p-2 w-full rounded mb-2" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Project</button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default ProjectForm;