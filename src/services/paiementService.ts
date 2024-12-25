import type { Paiement } from "@/models";
import axios from "axios";

export const getPaiements = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getPaiementById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const getPaiementsByEtudiantId = async (
    endpoint: string,
    id: number
) => {
    const response = await axios.get(`${endpoint}/etudiant/${id}/paiements`);
    return response.data;
};

export const createPaiement = async (endpoint: string, paiement: Paiement) => {
    const response = await axios.post(endpoint, paiement);
    return response.data;
};

export const updatePaiement = async (
    endpoint: string,
    id: number,
    paiement: Paiement
) => {
    const response = await axios.put(`${endpoint}/${id}`, paiement);
    return response.data;
};

export const deletePaiement = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
