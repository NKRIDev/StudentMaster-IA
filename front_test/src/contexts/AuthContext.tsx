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
    changeUser : (newUser : User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Data accessible from children
 */
export const AuthProvider = ({children} : {children : ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const changeUser = (newUser : User) => {
        setUser(newUser);
    }

    return (
        <AuthContext.Provider 
        value={{user, changeUser}}
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