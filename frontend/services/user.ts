import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2';

export const registerUser = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}/user/register`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true, // for cookies
  });
  return response.data;
};

export const loginUser = async (payload: {
  email?: string;
  username?: string;
  password: string;
}) => {
  return axios.post(`${BASE_URL}/user/login`, payload, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'  // ✅ Add this
    }
  });
};



export const getCurrentUser = async () => {
  return axios.get(`${BASE_URL}/user/current-user`, { withCredentials: true });
};

export const updateUser = async (data: any) => {
  return axios.post(`${BASE_URL}/user/update-user`, data, {
    withCredentials: true,
  });
};

export const updateAvatar = async (formData: FormData) => {
  return axios.post(`${BASE_URL}/user/update-avatar`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
};

export const logoutUser = async () => {
  return axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true });
};
