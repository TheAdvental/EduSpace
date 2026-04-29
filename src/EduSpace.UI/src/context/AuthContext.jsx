import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = parseJwt(token);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(decoded);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        const decoded = parseJwt(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}