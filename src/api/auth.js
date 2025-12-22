import axios from "axios";
import { USE_BACKEND, BACKEND_IP, BACKEND_PORT } from '@env';

const baseURL = `http://${BACKEND_IP}:${BACKEND_PORT}`;

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});


export async function login(username, password) {

    if (!USE_BACKEND || USE_BACKEND === 'false') {
        const isValid = (username === "toto" && password === "tata");
        return { success: isValid };
    }

    try {
        const res = await api.post("/api/auth/login", {
            username,
            password,
        });

        return {
            success: true,
            token: res.data.accessToken,
        };
    } 
    catch {
        return { success: false };
    }
}

export async function getUserInfo(token) {
    try {
        const res = await api.get("/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch {
        return null;
    }
}

export async function signup(email, username, password) {
    try {
        await api.post("/api/auth/register", {
            email,
            username,
            password,
        });

        return { success: true };
    } catch (err) {
        if (err.response.data.message) {
            return { success: false, message: err.response.data.message };
        }
        return { success: false };
    }
}

export async function editUserInfo(token, updates) {
    try {
        const res = await api.patch(
            "/api/users/me",
            updates,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return {
            success: true,
            user: res.data.user,
            token: res.data.accessToken,
        };
    } catch (err) {
        if (err.response.data.message) {
            return { success: false, message: err.response.data.message };
        }
        return { success: false };
    }
}

export async function removeFavorite(token, favorites, countryName) {
    const updatedFavorites = favorites.filter(
        c => c !== countryName
    );

    return await editUserInfo(token, {
        favoriteCountries: updatedFavorites
    });
}