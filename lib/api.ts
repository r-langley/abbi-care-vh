export const API_BASE = (process.env.API_URL || "https://api.skanmyskin.com").replace(/\/$/, "")

export function apiUrl(path: string) {
    return `${API_BASE}/${path.replace(/^\//, "")}`
}

export async function apiFetch(path: string, options?: RequestInit) {
    return await fetch(apiUrl(path), {
        headers: {"Content-Type": "application/json"},
        ...options,
    })
}