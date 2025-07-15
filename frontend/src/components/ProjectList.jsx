import React, { useEffect, useState } from "react"
import {getProjects} from '../services/api';
import ProjectForm from '../components/ProjectForm';

const ProjectList = ({role}) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load projects');
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);
    if (loading) return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
                {role === 'builder' ? 'Assigned Projects' : 'Projects'}
            </h2>
            <div className="grid gap-4">
                {projects.length === 0 ? (
                    <p>No projects available</p>
                ) : (
                    projects.map((project) => (
                        <div key ={project._id} className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold">{project.name}</h3>
                            <p className="text-gray-600">{project.description}</p>
                            <div className="mt-2">
                                <p>Budget: {project.budget}</p>
                                <p>Timeline: project.timeline</p>
                                <div className="w-full bg-gray-200 rounded h-2.5 mt-2">
                                    <div
                                    className="bg-blue-600 h-2.5 rounded
                                    style = {{width: `${project.progress || 0}%` }}"
                                    ></div>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{project.progress || 0}% Complete</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;