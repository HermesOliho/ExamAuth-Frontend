import type { Filiere } from "@/models";
import axios from "axios";

export const getFilieres = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getFiliereById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createFiliere = async (endpoint: string, filiere: Filiere) => {
    const response = await axios.post(endpoint, filiere);
    return response.data;
};

export const updateFiliere = async (
    endpoint: string,
    id: number,
    filiere: Filiere
) => {
    const response = await axios.put(`${endpoint}/${id}`, filiere);
    return response.data;
};

export const deleteFiliere = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
