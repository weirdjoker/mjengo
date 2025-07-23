import React from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ReceiptList from '../components/ReceiptList';
import WorkerLog from '../components/WorkerLog';

// Dummy data for demonstration
const dummyProject = {
  id: 1,
  name: 'Luxury Villa',
  description: 'A modern luxury villa project.',
  builder: { name: 'Builder 1', username: 'builder1', photo: 'https://via.placeholder.com/80' },
  commenceDate: '2025-07-01',
  status: 'ongoing',
  images: [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  ],
  progress: 65,
};

const ProjectDetails = () => {
  const { id } = useParams();
  // In a real app, fetch project by id
  const project = dummyProject;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="mb-2">{project.description}</p>
      <div className="mb-2">
        <span className="font-semibold">Commence Date:</span> {project.commenceDate}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span> {project.status}
      </div>
      <div className="mb-4 flex items-center gap-4">
        <img src={project.builder.photo} alt={project.builder.name} className="w-16 h-16 rounded-full" />
        <div>
          <div className="font-semibold">Builder: {project.builder.name}</div>
          <div className="text-sm text-gray-600">Username: {project.builder.username}</div>
        </div>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Project Images:</span>
        <div className="flex gap-4 mt-2">
          {project.images.map((img, idx) => (
            <img key={idx} src={img} alt={`Project ${idx + 1}`} className="w-32 h-32 object-cover rounded" />
          ))}
        </div>
      </div>
      <ProgressBar progress={project.progress} />
      <h2 className="text-lg font-bold mt-6 mb-2">Receipts</h2>
      <ReceiptList projectId={project.id} />
      <h2 className="text-lg font-bold mt-6 mb-2">Daily Worker Log</h2>
      <WorkerLog projectId={project.id} />
    </div>
  );
};

export default ProjectDetails;