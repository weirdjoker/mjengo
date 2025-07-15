import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Projects
export const getProjects = () => api.get('/projects');
export const createProject = (project) => api.post('/projects', project);

// Tasks
export const getTasks = (projectId) => api.get(`/tasks/${projectId}`);
export const createTask = (task) => api.post('/tasks', task);

// Orders
export const getOrders = (projectId) => api.get(`/orders/${projectId}`);
export const createOrder = (order) => api.post('/orders', order);

// Items
export const getItems = () => api.get('/items');
export const createItem = (item) => api.post('/items', item);

// Users
export const getUsers = () => api.get('/users');