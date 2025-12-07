import { API } from "@/api/axios"

/*
retrieve the summary
*/
export const getSummary = () => {
    return API.get("/summary");
}