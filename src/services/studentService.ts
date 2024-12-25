export const getStudents = async (endpoint: string) => {
    const r = await fetch(`${endpoint}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentById = async (endpoint: string, id: number) => {
    const r = await fetch(`${endpoint}/${id}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentByMatricule = async (
    endpoint: string,
    matricule: string
) => {
    const r = await fetch(`${endpoint}/etudiant/${matricule}/find`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const deleteStudentById = async (endpoint: string, id: number) => {
    const r = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getStudentByRegister = async (
    endpoint: string,
    matricule: string
) => {
    const r = await fetch(`${endpoint}/find/${matricule}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const findStudent = async (endpoint: string, matricule: string) => {
    const response = await fetch(
        `${endpoint}/find-student?matricule=${matricule}`
    );
    if (response.ok) {
        return response.json();
    }
    return false;
};
