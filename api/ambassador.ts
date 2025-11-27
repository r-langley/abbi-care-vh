import { apiFetch } from './api';

export const getAmbassadorDataFinal = async (customerId: string, date: string, version: string = 'v1') => {
    const res = await apiFetch(`/ambassador/user_data_final`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ customerId, date, version }),
    });
    if (!res.ok) {
        throw new Error('Failed to get ambassador data');
    }
    return await res.json() as Promise<any>;
};
