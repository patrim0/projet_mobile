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


