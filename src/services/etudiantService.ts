import type { Etudiant } from "@/models";
import axios from "axios";

export const getEtudiants = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getEtudiantById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createEtudiant = async (endpoint: string, etudiant: Etudiant) => {
    const response = await axios.post(endpoint, etudiant);
    return response.data;
};

export const updateEtudiant = async (
    endpoint: string,
    id: number,
    etudiant: Etudiant
) => {
    const response = await axios.put(`${endpoint}/${id}`, etudiant);
    return response.data;
};

export const deleteEtudiant = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
