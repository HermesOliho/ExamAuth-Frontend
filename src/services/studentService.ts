import { pinia } from "@/main";
import { useApiStore } from "@/stores/apiStore";

const apiStore = useApiStore(pinia);

const endpoint = `${apiStore.api}/etudiants`;

export const getStudents = async () => {
    const r = await fetch(`${endpoint}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentById = async (id: number) => {
    const r = await fetch(`${endpoint}/${id}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentByMatricule = async (matricule: string) => {
    const r = await fetch(`${apiStore.api}/etudiant/${matricule}/find`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const deleteStudentById = async (id: number) => {
    const r = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentByRegister = async (matricule: string) => {
    const r = await fetch(`${endpoint}/find/${matricule}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const findStudent = async (matricule: string) => {
    const response = await fetch(
        `${apiStore.api}/find-student?matricule=${matricule}`
    );
    if (response.ok) {
        return response.json();
    }
    return false;
};
