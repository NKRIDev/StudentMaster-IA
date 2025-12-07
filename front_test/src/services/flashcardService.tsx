import { API } from "@/api/axios"

/**
retrieve the flaschzrds arrys
 */
export const getFlashcards = () =>{
    return API.get("/flashcards");
}