import { USE_BACKEND, BACKEND_IP, BACKEND_PORT } from '@env';

export async function login(username, password) {

    if (!USE_BACKEND || USE_BACKEND === 'false') {
        const isValid = (username === "toto" && password === "tata");
        return { success: isValid };
    }

    try {
        const res = await fetch(`http://${BACKEND_IP}:${BACKEND_PORT}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            return { success: false }
        }

        const data = await res.json();
        return { success: true, token: data.accessToken };
    }
    catch (err) {
        return { success: false }
    }
}

export async function getUserInfo(token) {
    const res = await fetch(`http://${BACKEND_IP}:${BACKEND_PORT}/api/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return await res.json();
}

export async function signup(email, username, password) {
    try {
        const res = await fetch(`http://${BACKEND_IP}:${BACKEND_PORT}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email
            })
        });

        if (!res.ok) {
            const error = await res.json();
            return { success: false, message: error.message };
        }

        return { success: true };
    }
    catch (err) {
        return { success: false };
    }
}