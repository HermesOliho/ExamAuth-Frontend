export const getPayments = async (endpoint: string) => {
    const r = await fetch(`${endpoint}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getPaymentById = async (endpoint: string, id: number) => {
    const r = await fetch(`${endpoint}/${id}`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const getPaymentsByUserId = async (endpoint: string, id: number) => {
    const r = await fetch(`${endpoint}/students/${id}/payments`);
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible de contacter le serveur");
};

export const addPayment = async (endpoint: string, data: any) => {
    const r = await fetch(`${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (r.ok) {
        return r.json();
    }
    throw new Error("Impossible d'enregistrer le paiement'");
};
