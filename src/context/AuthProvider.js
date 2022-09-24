import { createContext, useState } from "react";

const AuthContext = createContext({});

// children - components nested inside the AuthProvider
export const AuthProvider = ({ children }) => {
    // {} means it's an object
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;