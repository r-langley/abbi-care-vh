import { apiFetch } from './api';

export interface UserInfo {
  id: string
  firstname: string
  lastname: string
  email: string
  created_at?: string
  avatar?: string
  is_affiliate?: number
}

export const LogIn = async (email: string, password: string) => {
  const res = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return await res.json() as Promise<{ token: string; user: any }>;
};

export const LogOut = async () => {
  const res = await apiFetch('/auth/logout', {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }
};

export const authenticateToken = async (token: string) => {
  const res = await apiFetch('/user/me', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Token validation failed');
  }

  return await res.json() as Promise<UserInfo>;
}