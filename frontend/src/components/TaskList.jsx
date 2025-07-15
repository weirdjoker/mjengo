import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { getTasks } from "../services/api";

const TaskList = () => {
    const { projectId} = useParams();
    const[tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect (() => {
        const fetchTasks = async () => {
            try{
                const response = await getTasks(projectId);
                setTasks(response.data);
            } catch (err) {
                setError('Failed to load tasks');
                console.error(err); 
            }
        };
        fetchTasks();
    },[projectId]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key= {task._id} className="p-2 border rounded">
                        {task.title}
                    </li>
                ))};
            </ul>
        </div>
    );
};

export default TaskList;