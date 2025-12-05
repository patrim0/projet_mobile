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
        return { success : true, token: data.accessToken };
    }
    catch (err) {
        return { success: false }
    }
}