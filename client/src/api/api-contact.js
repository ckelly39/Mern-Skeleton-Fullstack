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

// Get all contacts
const listContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Create contact
const createContact = async (contact) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, contact, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Update contact
const updateContact = async (contactId, contact) => {
  try {
    const response = await axios.put(`${API_URL}/contacts/${contactId}`, contact, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Delete contact
const deleteContact = async (contactId) => {
  try {
    const response = await axios.delete(`${API_URL}/contacts/${contactId}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export { listContacts, createContact, updateContact, deleteContact };