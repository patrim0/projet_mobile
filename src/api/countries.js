import axios from "axios";
const base = "https://restcountries.com/v3.1";

export async function findCountries(q) {
  if (!q || q.length < 1) return [];
  const url = `${base}/name/${encodeURIComponent(q)}?fields=name,flags,region`;
  const { data } = await axios.get(url);
  return data.map(p => ({
    name: p?.name?.common || "",
    region: p?.region || "",
    flagPng: p?.flags?.png || "",
  }));
}
