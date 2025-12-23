import axios from "axios";

const WEATHER_API_KEY = "24923ddba8b949cb902144825252012";

export async function getTodayCityWeather({ city, lat, lon }) {
    
    if (!city && (lat == null || lon == null)) return null;

    try {
        let q = city;
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
            feelsLikeC: data.current.feelslike_c,
            humidity: data.current.humidity,
            windKph: data.current.wind_kph
        };
    } catch {
        return null;
    }
}

export async function getCityWeatherWithForecast({ city }) {
    if (!city) return null;

    try {
        const res = await axios.get(
            "https://api.weatherapi.com/v1/forecast.json",
            {
                params: {
                    key: WEATHER_API_KEY,
                    q: city,
                    days: 8,   
                    aqi: "no",
                    alerts: "no",
                },
            }
        );

        const data = res.data;
        if (!data?.current || !data?.forecast?.forecastday) return null;

        const currentIcon = data.current.condition?.icon;
        const currentIconUrl =
            currentIcon?.startsWith("//") ? `https:${currentIcon}` : currentIcon;

        return {
            current: {
                tempC: data.current.temp_c,
                feelsLikeC: data.current.feelslike_c,
                humidity: data.current.humidity,
                windKph: data.current.wind_kph,
                condition: data.current.condition?.text || "",
                icon: currentIconUrl,

                cloud: data.current.cloud,
                uv: data.current.uv,
                pressureMb: data.current.pressure_mb,
                visibilityKm: data.current.vis_km,

                rainChance: data.forecast.forecastday[0]?.day?.daily_chance_of_rain
            },
            forecast: data.forecast.forecastday.slice(1).map(day => {
                const icon = day.day.condition?.icon;
                return {
                    date: day.date,
                    minC: day.day.mintemp_c,
                    maxC: day.day.maxtemp_c,
                    condition: day.day.condition?.text || "",
                    icon: icon?.startsWith("//") ? `https:${icon}` : icon,
                };
            }),
        };
    } catch {
        return null;
    }
}

export async function searchCity(query) {
    if (!query || query.length < 2) return [];

    try {
        const res = await axios.get(
            "https://api.weatherapi.com/v1/search.json",
            {
                params: {
                    key: WEATHER_API_KEY,
                    q: query
                }
            }
        );

        return res.data.map(item => ({
            name: item.name,
            region: item.region,
            country: item.country,
            lat: item.lat,
            lon: item.lon
        }));
    } catch {
        return [];
    }
}