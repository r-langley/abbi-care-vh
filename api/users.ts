import { apiFetch } from './api';

export const getUser = async (id: string) => {
  const res = await apiFetch(`/users/${id}`);
  if (!res.ok) {
    throw new Error('Failed to get user');
  }
  return res.json() as Promise<{ id: string; name: string; email: string }>;
};

export const listUsersForOrganization = async (organizationId: string, query = {}) => {
  const res = await apiFetch(`/organization/${organizationId}/customers`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
    }
  });
  if (!res.ok) {
    throw new Error('Failed to list users');
  }
  return await res.json() as Promise<Array<any>>;
};