import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface LoginPayload {
  email: string;
  mot_de_passe: string;
}

interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  mot_de_passe_confirmation: string;
  telephone: string;
  localisation?: string;
  id_role?: number;
  id_parrain?: number;
}

export const login = async (payload: LoginPayload) => {
  const response = await axios.post(`${API_URL}/login`, payload);
  return response.data;
};

export const register = async (payload: RegisterPayload) => {
  const response = await axios.post(`${API_URL}/register`, payload);
  return response.data;
};

export const logout = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await axios.post(
    `${API_URL}/refresh`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const me = async (token: string) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};