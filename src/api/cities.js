import axios from "axios";
import { BACKEND_IP, BACKEND_PORT } from "@env";

const baseURL = `http://${BACKEND_IP}:${BACKEND_PORT}`;

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getCitiesByCca3(cca3) {

    try {
        const res = await api.get("/api/cities", {
            params: { cca3 }
        });

        return res.data;
    } catch {
        return [];
    }
}
