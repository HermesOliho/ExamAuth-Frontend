import { pinia } from "@/main";
import type { Promotion } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/promotions`; // Remplacez par l'URL correcte

export const getPromotions = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getPromotionById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createPromotion = async (promotion: Promotion) => {
    const response = await axios.post(endpoint, promotion);
    return response.data;
};

export const updatePromotion = async (id: number, promotion: Promotion) => {
    const response = await axios.put(`${endpoint}/${id}`, promotion);
    return response.data;
};

export const deletePromotion = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
