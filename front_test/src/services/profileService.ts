import { API } from "@/api/axios";

export interface ProfileResponse {
    user : {
        id: string,
        email: string,
        pseudo: string,
    }
}

export const getProfile = async () : Promise<ProfileResponse | null> => {
    try{
        const response = await API.get("/api/profile");
        return response.data;
    }
    catch(err){
        console.log("Error fetching profile:", err);
        return null;
    }
};
