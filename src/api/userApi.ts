import axios from 'axios';
import type { UserProfileForm, CreateUserResponse, UserProfileResponse } from '../types/user';

const API_BASE = 'http://localhost:3000/api/v1/users';

export const createUser = async (data: UserProfileForm): Promise<CreateUserResponse> => {
  const res = await axios.post(`${API_BASE}/create`, data);
  return res.data;
};

export const getUserProfile = async (user_id: string): Promise<UserProfileResponse> => {
  const res = await axios.post(`${API_BASE}/profile`, { user_id });
  return res.data;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const res = await axios.get(`${API_BASE}/check-email/${encodeURIComponent(email)}`);
  return res.data.exists;
};

export const deleteProfile = async (user_id: string): Promise<boolean> => {
  const res = await axios.delete(`${API_BASE}/${encodeURIComponent(user_id)}`);
  return res.data.exists;
};