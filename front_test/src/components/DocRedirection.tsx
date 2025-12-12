import { useDocument } from "@/contexts/DocumentContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom"

/**
 * Returns, but the main route, if 
 * there is no document that has been processed
 */
export const DocRedirection = ({children} : {children : ReactNode}) => {
    const document = useDocument();

    /*
    Returns to the main page if no data is available
    */
    if(document.document == null){
        return <Navigate to={"/"} replace/>;
        //TODO error message ?
    }

    return(
        <>
        {children}
        </>
    );
}