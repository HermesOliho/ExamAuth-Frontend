import type { FraisAcademiques } from "@/models";
import axios from "axios";

export const getFraisAcademiques = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getFraisAcademiqueById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createFraisAcademique = async (
    endpoint: string,
    paiement: FraisAcademiques
) => {
    const response = await axios.post(endpoint, paiement);
    return response.data;
};

export const updateFraisAcademique = async (
    endpoint: string,
    id: number,
    paiement: FraisAcademiques
) => {
    const response = await axios.put(`${endpoint}/${id}`, paiement);
    return response.data;
};

export const deleteFraisAcademiques = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
