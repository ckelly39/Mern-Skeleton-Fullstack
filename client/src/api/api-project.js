import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// Get all projects
const listProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create project
const createProject = async (project) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, project, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update project
const updateProject = async (projectId, project) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${projectId}`, project, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete project
const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export { listProjects, createProject, updateProject, deleteProject };