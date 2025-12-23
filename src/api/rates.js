import axios from "axios";

export async function getCurrentUsdBase() {
    try {
        const res = await axios.get(
            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json"
        );

        return res.data.usd;
    } catch {
        return null;
    }
}