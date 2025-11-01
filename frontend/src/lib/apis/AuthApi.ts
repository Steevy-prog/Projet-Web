import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const URL = import.meta.env.VITE_URL;

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

// in AuthApi.ts
export const autoLogin = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // ✅ return user data directly
  } catch (err) {
    console.error('Auto-login failed', err);
    return null;
  }
};

export const sociallogin = async () =>{
  const response = await axios.get(`${URL}/auth/google/redirect`);
  return response.data;
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