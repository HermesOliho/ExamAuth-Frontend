import type { Mention } from "@/models";
import axios from "axios";

export const getMentions = async (endpoint: string) => {
    const response = await axios.get(endpoint);
    return response.data;
};

export const getMentionById = async (endpoint: string, id: number) => {
    const response = await axios.get(`${endpoint}/${id}`);
    return response.data;
};

export const createMention = async (endpoint: string, mention: Mention) => {
    const response = await axios.post(endpoint, mention);
    return response.data;
};

export const updateMention = async (
    endpoint: string,
    id: number,
    mention: Mention
) => {
    const response = await axios.put(`${endpoint}/${id}`, mention);
    return response.data;
};

export const deleteMention = async (endpoint: string, id: number) => {
    const response = await axios.delete(`${endpoint}/${id}`);
    return response.data;
};
