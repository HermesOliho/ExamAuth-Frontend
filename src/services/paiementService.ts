import type { Paiement } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore();

const endpoint = `${apiStore.api}/paiements`; // Remplacez par l'URL correcte

export const getPaiements = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getPaiementById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const getPaiementsByEtudiantId = async (id: number) => {
    const response = await axios.get(
        `${apiStore.api}/etudiant/${id}/paiements`
    );
    return response.data;
};

export const createPaiement = async (paiement: Paiement) => {
    const response = await axios.post(endpoint, paiement);
    return response.data;
};

export const updatePaiement = async (id: number, paiement: Paiement) => {
    const response = await axios.put(`${endpoint}/${id}`, paiement);
    return response.data;
};

export const deletePaiement = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
