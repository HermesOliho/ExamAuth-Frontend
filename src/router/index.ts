import Home from "@/views/Home.vue";
import Manager from "@/views/Manager.vue";
import AddDerogation from "@/views/manager/derogations/AddDerogation.vue";
import ListDerogations from "@/views/manager/derogations/ListDerogations.vue";
import EditDomaine from "@/views/manager/domaines/EditDomaine.vue";
import ListDomaines from "@/views/manager/domaines/ListDomaines.vue";
import ShowDomaine from "@/views/manager/domaines/ShowDomaine.vue";
import EditEtudiant from "@/views/manager/etudiants/EditEtudiant.vue";
import ListEtudiants from "@/views/manager/etudiants/ListEtudiants.vue";
import ShowEtudiant from "@/views/manager/etudiants/ShowEtudiant.vue";
import EditFiliere from "@/views/manager/filieres/EditFiliere.vue";
import ListFilieres from "@/views/manager/filieres/ListFilieres.vue";
import ShowFiliere from "@/views/manager/filieres/ShowFiliere.vue";
import AssignerPromotion from "@/views/manager/frais-academiques/AssignerPromotion.vue";
import ListeFrais from "@/views/manager/frais-academiques/ListeFrais.vue";
import EditMention from "@/views/manager/mentions/EditMention.vue";
import ListMentions from "@/views/manager/mentions/ListMentions.vue";
import ShowMention from "@/views/manager/mentions/ShowMention.vue";
import AddPaiement from "@/views/manager/paiements/AddPaiement.vue";
import ListPaiements from "@/views/manager/paiements/ListPaiements.vue";
import EditPromotion from "@/views/manager/promotions/EditPromotion.vue";
import ListPromotions from "@/views/manager/promotions/ListPromotions.vue";
import ShowPromotion from "@/views/manager/promotions/ShowPromotion.vue";
import Settings from "@/views/Settings.vue";
import Student from "@/views/Student.vue";
import ScanQr from "@/views/user/ScanQr.vue";
import User from "@/views/user/User.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/student",
            name: "student_space",
            component: Student,
        },
        {
            path: "/settings",
            name: "settings",
            component: Settings,
        },
        {
            path: "/user",
            name: "user_space",
            component: User,
            children: [
                // Scan de code QR
                {
                    path: "scanner-qr",
                    name: "scanner_qr",
                    component: ScanQr,
                },
            ],
        },
        {
            path: "/manager",
            name: "manager_space",
            meta: { requiresAuth: true },
            component: Manager,
            children: [
                // Domaines
                {
                    path: "domaines",
                    name: "liste_domaines",
                    component: ListDomaines,
                },
                {
                    path: "domaines/create",
                    name: "ajouter_domaine",
                    component: EditDomaine,
                },
                {
                    path: "domaines/edit/:id",
                    name: "modifier_domaine",
                    component: EditDomaine,
                },
                {
                    path: "domaines/:id",
                    name: "voir_domaine",
                    component: ShowDomaine,
                },
                // Filières
                {
                    path: "filieres",
                    name: "liste_filieres",
                    component: ListFilieres,
                },
                {
                    path: "filieres/create",
                    name: "ajouter_filiere",
                    component: EditFiliere,
                },
                {
                    path: "filieres/edit/:id",
                    name: "modifier_filiere",
                    component: EditFiliere,
                },
                {
                    path: "filieres/:id",
                    name: "voir_filiere",
                    component: ShowFiliere,
                },
                // Mentions
                {
                    path: "mentions",
                    name: "liste_mentions",
                    component: ListMentions,
                },
                {
                    path: "mentions/create",
                    name: "ajouter_mention",
                    component: EditMention,
                },
                {
                    path: "mentions/edit/:id",
                    name: "modifier_mention",
                    component: EditMention,
                },
                {
                    path: "mentions/:id",
                    name: "voir_mention",
                    component: ShowMention,
                },
                // Promotion
                {
                    path: "promotions",
                    name: "liste_promotions",
                    component: ListPromotions,
                },
                {
                    path: "promotions/create",
                    name: "ajouter_promotion",
                    component: EditPromotion,
                },
                {
                    path: "promotions/edit/:id",
                    name: "modifier_promotion",
                    component: EditPromotion,
                },
                {
                    path: "promotions/:id",
                    name: "voir_promotion",
                    component: ShowPromotion,
                },
                // Etudiants
                {
                    path: "etudiants",
                    name: "liste_etudiants",
                    component: ListEtudiants,
                },
                {
                    path: "etudiants/create",
                    name: "ajouter_etudiant",
                    component: EditEtudiant,
                },
                {
                    path: "etudiants/edit/:id",
                    name: "modifier_etudiant",
                    component: EditEtudiant,
                },
                {
                    path: "etudiants/:id",
                    name: "voir_etudiant",
                    component: ShowEtudiant,
                },
                // Paiements
                {
                    path: "paiements/ajouter",
                    name: "ajouter_paiement",
                    component: AddPaiement,
                },
                {
                    path: "paiements",
                    name: "liste_paiements",
                    component: ListPaiements,
                },
                // Derogations
                {
                    path: "derogations/ajouter",
                    name: "ajouter_derogation",
                    component: AddDerogation,
                },
                {
                    path: "derogations",
                    name: "liste_derogations",
                    component: ListDerogations,
                },
                // Frais académiques
                {
                    path: "frais-academiques",
                    name: "liste_frais",
                    component: ListeFrais,
                },
                {
                    path: "frais-academiques/:id_tranche/to-promotion",
                    name: "frais_to_promotion",
                    component: AssignerPromotion,
                },
            ],
        },
    ],
});

export default router;
