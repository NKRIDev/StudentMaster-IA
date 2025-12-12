import { Document } from '@/models/DocumentModel';
import { createContext, ReactNode, useContext, useState } from 'react';

/**
 * What the context takes as a parameter
 */
interface DocumentContextType {
    document : any;
    changeDocument : (newDocument : Document) => void;
};

const DocumentContext = createContext<DocumentContextType | null>(null);

/**
 * Data accessible from children
 */
export const DocumentProvider = ({children} : {children : ReactNode}) => {
    const [document, setDocument] = useState<Document | null>(null);

    const changeDocument = (newDocument : Document) => {
        setDocument(newDocument);
    }

    return (
        <DocumentContext.Provider 
        value={{document, changeDocument}}
        >
            {children}
        </DocumentContext.Provider>
    );
};

/*
retrieve the elements
*/
export const useDocument = (): DocumentContextType => {
    const context = useContext(DocumentContext);
    
    if(!context){
        throw new Error("useDocument must be used within an DocumentProvider");
    }
    
    return context;
};