import axios from "axios";

const WEATHER_API_KEY = "24923ddba8b949cb902144825252012";

export async function getTodayCapitalWeather({ capital, lat, lon }) {
    
    if (!capital && (lat == null || lon == null)) return null;

    try {
        let q = capital;
        if (lat != null && lon != null) {
            q = `${lat},${lon}`;
        }

        const res = await axios.get(
            "https://api.weatherapi.com/v1/current.json",
            {
                params: {
                    key: WEATHER_API_KEY,
                    q,
                    aqi: "no",
                },
            }
        );

        const data = res.data;
        if (!data?.current) return null;

        const icon = data.current.condition?.icon;
        const iconUrl =
            icon && icon.startsWith("//") ? `https:${icon}` : icon || null;

        return {
            tempC: data.current.temp_c,
            condition: data.current.condition?.text || "",
            icon: iconUrl,
        };
    } catch {
        return null;
    }
}
