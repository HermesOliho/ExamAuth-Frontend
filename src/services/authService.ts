import { pinia } from "@/main";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/auth`;

export const login = async (credentials: {
    email: string;
    password: string;
}) => {
    const response = await axios.post(`${endpoint}/login`, credentials);
    if (response.status == 200 && response.data.success) {
        return response.data.user;
    } else
        return {
            statusText: response.statusText,
            data: response.data,
        };
};

export const logout = async () => {
    const response = await axios.post(`${endpoint}/logout`);
    if (response.status == 200) {
        return true;
    }
    return false;
};
