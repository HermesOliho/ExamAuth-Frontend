import type { Derogation } from "@/models";
import axios from "axios";

export const getDerogations = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getDerogationById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const getDerogationsByEtudiantId = async (
    endpoint: string,
    id: number
) => {
    const response = await axios.get(`${endpoint}/etudiant/${id}/derogations`);
    return response.data;
};

export const createDerogation = async (
    endpoint: string,
    paiement: Derogation
) => {
    const response = await axios.post(endpoint, paiement);
    return response.data;
};

export const updateDerogation = async (
    endpoint: string,
    id: number,
    paiement: Derogation
) => {
    const response = await axios.put(`${endpoint}/${id}`, paiement);
    return response.data;
};

export const deleteDerogation = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
