import { apiUrl } from "@/api/infos";
import type { FraisAcademiques } from "@/models";
import axios from "axios";

const API_URL = `${apiUrl}/frais-academiques`; // Remplacez par l'URL correcte

export const getFraisAcademiques = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getFraisAcademiqueById = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createFraisAcademique = async (paiement: FraisAcademiques) => {
    const response = await axios.post(API_URL, paiement);
    return response.data;
};

export const updateFraisAcademique = async (
    id: number,
    paiement: FraisAcademiques
) => {
    const response = await axios.put(`${API_URL}/${id}`, paiement);
    return response.data;
};

export const deleteFraisAcademiques = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
