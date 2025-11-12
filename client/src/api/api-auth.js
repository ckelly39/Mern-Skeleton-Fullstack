import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Sign up
const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, user);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Sign in
const signin = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, user);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Sign out
const signout = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/signout`);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export { signup, signin, signout };