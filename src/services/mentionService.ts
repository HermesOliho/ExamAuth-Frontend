import { pinia } from "@/main";
import type { Mention } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/mentions`; // Remplacez par l'URL correcte

export const getMentions = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getMentionById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createMention = async (mention: Mention) => {
    const response = await axios.post(endpoint, mention);
    return response.data;
};

export const updateMention = async (id: number, mention: Mention) => {
    const response = await axios.put(`${endpoint}/${id}`, mention);
    return response.data;
};

export const deleteMention = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
