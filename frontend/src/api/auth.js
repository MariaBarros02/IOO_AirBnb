import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const registerRequest = (user) =>
  axios.post(`${API_URL}/register`, user, {
    withCredentials: true,
  });

export const loginRequest = (user) =>
  axios.post(`${API_URL}/login`, user, {
    withCredentials: true,
  });

export const logoutRequest = (user) =>
  axios.post(`${API_URL}/logout`, user, {
    withCredentials: true,
  });
