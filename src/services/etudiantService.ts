import type { Etudiant } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore();

const endpoint = `${apiStore.api}/etudiants`; // Remplacez par l'URL correcte

export const getEtudiants = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getEtudiantById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createEtudiant = async (etudiant: Etudiant) => {
    const response = await axios.post(endpoint, etudiant);
    return response.data;
};

export const updateEtudiant = async (id: number, etudiant: Etudiant) => {
    const response = await axios.put(`${endpoint}/${id}`, etudiant);
    return response.data;
};

export const deleteEtudiant = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
