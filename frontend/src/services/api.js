import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const filterData = (sessionId, filters) => {
  return axios.post(`${API_URL}/filter`, { sessionId, filters });
};