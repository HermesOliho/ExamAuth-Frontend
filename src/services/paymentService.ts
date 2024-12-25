import { apiUrl } from "@/api/infos";

const apiEndPoint = `${apiUrl}/payments`;

export const getPayments = async () => {
    const r = await fetch(`${apiEndPoint}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getPaymentById = async (id: number) => {
    const r = await fetch(`${apiEndPoint}/${id}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getPaymentsByUserId = async (id: number) => {
    const r = await fetch(`${apiUrl}/students/${id}/payments`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const addPayment = async (data: any) => {
    const r = await fetch(`${apiEndPoint}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible d'enregistrer le paiement'");
};
