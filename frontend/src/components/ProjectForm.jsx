import React, {useState} from 'react';
import { createProject } from '../services/api';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        description:'',
        budget:'',
        timeline:'',
        builder:'',


    });
    const[error, setError] = useState('');

    const handleChange = (e) => {
        setFormData ({...formData, [e.target.name] : e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createProject(formData);
            alert('project created successfully!');
            setFormData({name:'', description:'',budget:'',timeline:'', builder:''});
        }catch(err){
            setError('Failed to create project')
        }
    };

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Register New project</h2>
            {error && <p classname='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Project Name'
                className='w-full p-2 border rounded'
                required
                 />
                 <textarea name="description"
                 value={formData.name}
                 onChange={handleChange}
                 placeholder='Description'
                  className="w-full p-2 border rounded"
                  rows='4'
                  />
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="w-full p-2 border rounded"
                />
                  <input type="text"
                  name='timeline'
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder='Timeline (e.g., 6 months' 
                  className='w-full p-2 border rounded'
                  />
                  <select name="builder"
                   value={formData.builder}
                   onChange={handleChange}
                   className='w-full p-2 border rounded'
                   >
                    <option value="">Select Builder</option>
                    <option value="builder1">Builder 1</option>
                    <option value="builder2">Builder 2</option>
                   </select>
                   <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
                    Create Project
                   </button>
            </form>
        </div>
    );
};
export default ProjectForm;