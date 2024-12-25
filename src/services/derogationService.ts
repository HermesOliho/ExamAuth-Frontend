import type { Derogation } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore();

const endpoint = `${apiStore.api}/derogations`; // Remplacez par l'URL correcte

export const getDerogations = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getDerogationById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const getDerogationsByEtudiantId = async (id: number) => {
    const response = await axios.get(
        `${apiStore.api}/etudiant/${id}/derogations`
    );
    return response.data;
};

export const createDerogation = async (paiement: Derogation) => {
    const response = await axios.post(endpoint, paiement);
    return response.data;
};

export const updateDerogation = async (id: number, paiement: Derogation) => {
    const response = await axios.put(`${endpoint}/${id}`, paiement);
    return response.data;
};

export const deleteDerogation = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
