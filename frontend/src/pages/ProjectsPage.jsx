import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const projects = JSON.parse(localStorage.getItem('projects')) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <img src={project.image} alt={project.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;