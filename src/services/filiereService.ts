import { pinia } from "@/main";
import type { Filiere } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/filieres`; // Remplacez par l'URL correcte

export const getFilieres = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getFiliereById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createFiliere = async (filiere: Filiere) => {
    const response = await axios.post(endpoint, filiere);
    return response.data;
};

export const updateFiliere = async (id: number, filiere: Filiere) => {
    const response = await axios.put(`${endpoint}/${id}`, filiere);
    return response.data;
};

export const deleteFiliere = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
