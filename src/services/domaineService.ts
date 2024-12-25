import type { Domaine } from "@/models";
import axios from "axios";

export const getDomaines = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getDomaineById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createDomaine = async (endpoint: string, domaine: Domaine) => {
    const params = new URLSearchParams();
    params.set("nom", domaine.nom_domaine);
    const response = await axios.post(endpoint, params);
    return response.data;
};

export const updateDomaine = async (
    endpoint: string,
    id: number,
    domaine: Domaine
) => {
    const params = new URLSearchParams();
    params.set("nom", domaine.nom_domaine);
    const response = await axios.put(`${endpoint}/${id}`, params);
    return response.data;
};

export const deleteDomaine = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
