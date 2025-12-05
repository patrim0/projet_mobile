import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
}