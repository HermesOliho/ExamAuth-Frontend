import { apiUrl } from "@/api/infos";

const apiEndPoint = `${apiUrl}/exams`;

export const getExams = async () => {
    const r = await fetch(`${apiEndPoint}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getExamById = async (id: number) => {
    const r = await fetch(`${apiEndPoint}/${id}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getExamsByUserId = async (id: number) => {
    const r = await fetch(`${apiUrl}/students/${id}/exams`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};
