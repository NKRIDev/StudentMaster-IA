import { API } from "@/api/axios";

/**
 * Send the file to the server
 */
export const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return API.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};