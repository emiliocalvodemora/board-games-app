import axios from "axios";

export const fetchMe = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }  
};