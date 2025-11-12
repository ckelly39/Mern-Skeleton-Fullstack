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

// Get all qualifications
const listQualifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/qualifications`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create qualification
const createQualification = async (qualification) => {
  try {
    const response = await axios.post(`${API_URL}/qualifications`, qualification, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete qualification
const deleteQualification = async (qualificationId) => {
  try {
    const response = await axios.delete(`${API_URL}/qualifications/${qualificationId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export { listQualifications, createQualification, deleteQualification };