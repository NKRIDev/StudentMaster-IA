import { createContext, ReactNode, useContext, useState } from 'react';

/*
User model
*/
interface User {
    id: string;
    pseudo: string;
    email: string;
}

/**
 * What the context takes as a parameter
 */
interface AuthContextType { 
    user : User | null;
    token : string | null;
    login : (newToken : string, newUser : User) => void;
    logout : () => void;
    isAuthenticated : () => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Data accessible from children
 */
export const AuthProvider = ({children} : {children : ReactNode}) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);

    const login = (newToken : string, newUser : User) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        return token !== null;
    };

    return (
        <AuthContext.Provider 
        value={{user, token, login, logout, isAuthenticated}}
        >
            {children}
        </AuthContext.Provider>
    );
};

/*
retrieve the elements
*/
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
};