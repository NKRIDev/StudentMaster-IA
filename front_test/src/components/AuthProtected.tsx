import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ReactNode, use } from "react";
import { Navigate } from "react-router-dom";

/*
* Component protecting routes
*/
export const AuthProtected = ({children} : ReactNode) => {
    const {isAuthenticated} = useAuth();
    const {toast} = useToast();

    if(!isAuthenticated()) {
        toast({
            title: "Erreur",
            description: "Vous devez être connecté pour accéder à cette page.",
            variant: "destructive"
        });
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
};