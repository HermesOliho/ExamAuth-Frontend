import { pinia } from "@/main";
import type { Promotion } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

export const getPromotions = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getPromotionById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createPromotion = async (
    endpoint: string,
    promotion: Promotion
) => {
    const response = await axios.post(endpoint, promotion);
    return response.data;
};

export const updatePromotion = async (
    endpoint: string,
    id: number,
    promotion: Promotion
) => {
    const response = await axios.put(`${endpoint}/${id}`, promotion);
    return response.data;
};

export const deletePromotion = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
