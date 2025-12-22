import axios from "axios";

const base = "https://restcountries.com/v3.1";

export async function findCountries(q) {
    if (!q) {
        return [];
    }

    if (q.length < 1) {
        return [];
    }

    try {
        const url = base + "/name/" + encodeURIComponent(q) + "?fields=name,flags,region";
        const rep = await axios.get(url);
        const data = rep.data;

        const resultat = [];

        for (let i = 0; i < data.length; i++) {
            const pays = data[i];

            let nom = "";
            let region = "";
            let drapeau = "";

            if (pays.name) {
                if (pays.name.common) {
                    nom = pays.name.common;
                }
            }

            if (pays.region) {
                region = pays.region;
            }

            if (pays.flags) {
                if (pays.flags.png) {
                    drapeau = pays.flags.png;
                }
            }

            resultat.push({
                name: nom,
                region: region,
                flagPng: drapeau
            });
        }

        return resultat;
    } catch (e) {
        return [];
    }
}

export async function getAllCountries() {
    try {
        const url = base + "/all?fields=name,flags,region";
        const rep = await axios.get(url);
        const data = rep.data;

        const resultat = [];

        for (let i = 0; i < data.length; i++) {
            const pays = data[i];

            let nom = "";
            let region = "";
            let drapeau = "";

            if (pays.name) {
                if (pays.name.common) {
                    nom = pays.name.common;
                }
            }

            if (pays.region) {
                region = pays.region;
            }

            if (pays.flags) {
                if (pays.flags.png) {
                    drapeau = pays.flags.png;
                }
            }

            resultat.push({
                name: nom,
                region: region,
                flagPng: drapeau
            });
        }

        return resultat;
        } catch (e) {
        return [];
    }
}

export async function getDetails(countryName) {
    try {
        const url = `${base}/name/${encodeURIComponent(countryName)}?fullText=true`;
        const rep = await axios.get(url);
        return rep.data[0];
    } catch {
        return null;
    }
}

export async function getCountryDetails(countryName) {

    try {

        const url = `${base}/name/${encodeURIComponent(countryName)}?fullText=true`;
        const rep = await axios.get(url);
        const pays = rep.data[0];

        const langues = pays.languages ? Object.values(pays.languages).join(", ") : "N/A";

        
        const monnaies = pays.currencies 
            ? Object.values(pays.currencies).map(c => `${c.name} (${c.symbol})`).join(", ")
            : "N/A";

        
        const capitale = pays.capital ? pays.capital[0] : "N/A";

        return {
            name: pays.name.common,
            officialName: pays.name.official || pays.name.common,
            flagPng: pays.flags.png,
            flagSvg: pays.flags.svg,
            population: pays.population || 0,
            area: pays.area || 0,
            capital: capitale,
            region: pays.region || "N/A",
            subregion: pays.subregion || "N/A",
            languages: langues,
            currencies: monnaies,
            timezones: pays.timezones ? pays.timezones.join(", ") : "N/A",
            continents: pays.continents ? pays.continents.join(", ") : "N/A",
            borders: pays.borders ? pays.borders.length : 0,
            landlocked: pays.landlocked ? "Oui" : "Non",
        };
    } catch (e) {
        return null;
    }
}

export async function compareCountries(countryNames) {
    try {
        const promises = countryNames.map(name => getCountryDetails(name));
        const results = await Promise.all(promises);
        return results.filter(r => r !== null);

    }
    catch (e) {
        return [];
    }
}
