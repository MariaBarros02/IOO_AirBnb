import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const registerRequest = (user) =>
  
  axios.post(`${API_URL}/api/register`, user, {
    withCredentials: true,
  });

export const loginRequest = (user) =>
  axios.post(`${API_URL}/api/login`, user, {
    withCredentials: true,
  });

export const logoutRequest = (user) =>
  axios.post(`${API_URL}/api/logout`, user, {
    withCredentials: true,
  });
