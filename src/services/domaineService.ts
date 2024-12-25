import { pinia } from "@/main";
import type { Domaine } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/domaines`; // Remplacez par l'URL correcte

export const getDomaines = async () => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getDomaineById = async (id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createDomaine = async (domaine: Domaine) => {
    const params = new URLSearchParams();
    params.set("nom", domaine.nom_domaine);
    const response = await axios.post(endpoint, params);
    return response.data;
};

export const updateDomaine = async (id: number, domaine: Domaine) => {
    const params = new URLSearchParams();
    params.set("nom", domaine.nom_domaine);
    const response = await axios.put(`${endpoint}/${id}`, params);
    return response.data;
};

export const deleteDomaine = async (id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
