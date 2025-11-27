import {apiFetch, getQueryString} from './api';

export const getAnalysis = async (id: string) => {
    const res = await apiFetch(`/analysis/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to get analysis data');
    }
    return await res.json() as Promise<any>;
};

export const getUserAnalysis = async (customer_id: string, query: object = {}) => {
    const res = await apiFetch(`/analysis_user/${customer_id}${getQueryString(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to get all analysis data');
    }
    return await res.json() as Promise<any[]>;
};

export const getOrganizationAnalysis = async (organization_id: string, query: object = {}) => {
    const res = await apiFetch(`/analysis_org/${organization_id}${getQueryString(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }
    });
    if (!res.ok) {
        throw new Error('Failed to get organization analysis data');
    }
    return await res.json() as Promise<any[]>;
};
