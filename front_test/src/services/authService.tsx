import { API } from "@/api/axios";

export interface RegisterData {
    pseudo: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse<T = any> {
    message?: string;
    error?: string;
    user?: T;
}

export const registerUser = async (data : RegisterData) : Promise<RegisterResponse> => {
    try{
        const response = await API.post("/api/auth/register", data);
        return response.data;
    }
    catch(err : any) {
        if(err.response && err.response.data && err.response.data.error){
            return {
                error: err.response.data.error
            };
        }

        return {
            error: "Impossible d'accèder au serveur."
        }
    }
};