export const API_BASE = (process.env.API_URL || "https://api.skanmyskin.com").replace(/\/$/, "")
export const MARKETPLACE_API_URL = (process.env.MP_URL || 'https://marketplace.abbi.care').replace(/\/$/, "");


export async function apiFetch(path: string, options?: RequestInit) {
    return await fetch(`${API_BASE}/${path.replace(/^\//, "")}`, {
        headers: {"Content-Type": "application/json"},
        ...options,
    })
}

export async function marketplaceApiFetch(path: string, options?: RequestInit) {
    return await fetch(`${MARKETPLACE_API_URL}/${path.replace(/^\//, "")}`, {
        headers: {"Content-Type": "application/json"},
        ...options,
    })
}

export function getQueryString(query: object){
    let queryString = '';
    if(Object.keys(query).length > 0){
        queryString = new URLSearchParams(query as Record<string, string>).toString();
        queryString = `?${queryString}`;
    }
    return queryString;
}