export interface Domaine {
    id_domaine: number; // Correspond à l'identifiant unique du domaine
    nom_domaine: string; // Le nom du domaine
    filieres?: Filiere[];
    created_at?: string; // Date de création, facultative
    updated_at?: string; // Date de mise à jour, facultative
}

export interface Filiere {
    id_filiere: number; // Identifiant unique de la filière
    nom_filiere: string; // Nom de la filière
    domaine_id: number; // Clé étrangère qui référence un domaine
    domaine?: Domaine; // Objet Domaine optionnel pour représenter la relation
    mentions?: Mention[];
    created_at?: string; // Date de création, facultative
    updated_at?: string; // Date de mise à jour, facultative
}

export interface Promotion {
    id_promotion: number; // Identifiant unique de la promotion
    nom_promotion: string; // Nom de la promotion
    mention_id: number; // Clé étrangère qui référence une mention
    mention?: Mention;
    inscriptions?: Inscription[];
    created_at?: string; // Date de création, facultative
    updated_at?: string; // Date de mise à jour, facultative
}

export interface Mention {
    id_mention: number; // Identifiant unique de la mention
    nom_mention: string; // Nom de la mention
    filiere_id: number; // Clé étrangère qui référence une filière
    filiere?: Filiere; // Objet Filiere optionnel pour représenter la relation
    promotions?: Promotion[];
    created_at?: string; // Date de création, facultative
    updated_at?: string; // Date de mise à jour, facultative
}

export interface Etudiant {
    id_etudiant?: number; // Identifiant unique de l'étudiant
    nom: string; // Nom de l'étudiant
    post_nom: string; // Post-nom de l'étudiant
    prenom?: string; // Prénom de l'étudiant (nullable)
    sexe: "M" | "F"; // Sexe de l'étudiant (enum : 'M' ou 'F')
    matricule: string; // Matricule unique de l'étudiant
    adresse: string; // Adresse de l'étudiant
    lieu_naissance: string; // Lieu de naissance
    date_naissance: string; // Date de naissance au format ISO (ex. "2024-12-15")
    image_url?: string; // URL de l'image associée à l'étudiant
    created_at?: string; // Date de création (facultative)
    updated_at?: string;
    promotion?: Promotion;
    annee_academique?: string;
    inscriptions?: Inscription[];
    derogations?: Derogation[];
    paiements?: Paiement[];
    frais_promotion?: FraisAcademiques[];
    total_frais?: number;
    total_paiements?: number;
    solde_paiment?: number;
}

export interface Inscription {
    annee_academique: string; // Année académique (ex: "2023-2024")
    etudiant_id_etudiant: number; // Clé étrangère vers l'étudiant
    promotion_id_promotion: number; // Clé étrangère vers la promotion
    created_at?: string; // Date de création (facultative)
    updated_at?: string; // Date de mise à jour (facultative)
    etudiant: Etudiant; // Clé étrangère vers l'étudiant
    promotion: Promotion; // Clé étrangère vers l'étudiant
}

export interface Paiement {
    id_paiement: number; // Identifiant unique du paiement
    montant: number; // Montant payé, avec précision décimale
    num_bordereau: string; // Numéro du bordereau, max 50 caractères
    date_paiement: string; // Date du paiement (format ISO, ex: "2024-12-15")
    etudiant_id_etudiant?: number;
    etudiant?: Etudiant; // Clé étrangère vers l'étudiant
    created_at?: string; // Date de création (facultative)
    updated_at?: string; // Date de mise à jour (facultative)
}

export interface Derogation {
    id: number; // Identifiant unique de la dérogation
    motif: string; // Motif de la dérogation
    date_debut: string; // Date de début (format ISO, ex: "2024-12-15")
    date_fin: string; // Date de fin (format ISO, ex: "2025-01-15")
    etudiant_id?: number; // Clé étrangère vers l'étudiant
    etudiant?: Etudiant; // Clé étrangère vers l'étudiant
    created_at?: string; // Date de création (optionnelle)
    updated_at?: string; // Date de mise à jour (optionnelle)
}

export interface FraisAcademiques {
    id_tranche: number; // Identifiant unique de la tranche de paiement
    semestre: string; // Semestre correspondant (ex: "Semestre 1", "Semestre 2")
    montant: number; // Montant à payer, type décimal
    echeance_paiement: string; // Date d'échéance du paiement (format ISO: "2024-12-20")
    created_at?: string; // Date de création (optionnelle)
    updated_at?: string; // Date de mise à jour (optionnelle)
}

export interface Exam {
    id: number;
    course: string;
    exam_date: string | Date;
    room: string;
    start_time: string | Date;
    end_time: string | Date;
}
