import { createContext, useState } from "react";

export const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [selectedCountries, setSelectedCountries] = useState([]);
    const MAX_COUNTRIES = 3;

    const addCountry = (country) => {
        if (selectedCountries.length >= MAX_COUNTRIES) {
            return false; //Max atteint
        }
        
        // etre sur que les pays sont pas deja select
        const exists = selectedCountries.find(c => c.name === country.name);
        if (exists) {
            return false;
        }

        setSelectedCountries([...selectedCountries, country]);
        return true;
    };

    const removeCountry = (countryName) => {
        setSelectedCountries(selectedCountries.filter(c => c.name !== countryName));
    };

    const isSelected = (countryName) => {
        return selectedCountries.some(c => c.name === countryName);
    };

    const toggleCountry = (country) => {
        if (isSelected(country.name)) {
            removeCountry(country.name);
            return true;
        } else {
            return addCountry(country);
        }
    };

    const clearSelection = () => {
        setSelectedCountries([]);
    };

    const canAddMore = () => {
        return selectedCountries.length < MAX_COUNTRIES;
    };

    return (
        <CompareContext.Provider 
            value={{ 
                selectedCountries, 
                addCountry, 
                removeCountry, 
                toggleCountry,
                isSelected,
                clearSelection,
                canAddMore,
                maxCountries: MAX_COUNTRIES
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}