import { UserResponse } from '../interfaces/userResponse.ts';
import { baseUrl } from '../config/index.tsx';

const getToken = () => localStorage.getItem('token');

export const getMe = async (): Promise<UserResponse> => {
  const response = await fetch(`${baseUrl}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};
