import Home from "@/views/Home.vue";
import Manager from "@/views/Manager.vue";
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
            // children: [
            //     {
            //         path: "domaines",
            //         name: "liste_domaines",
            //         component: ListDomaines,
            //     },
            //     {
            //         path: "domaines/create",
            //         name: "ajouter_domaine",
            //         component: EditDomaine,
            //     },
            //     {
            //         path: "domaines/edit/:id",
            //         name: "modifier_domaine",
            //         component: EditDomaine,
            //     },
            //     {
            //         path: "domaines/:id",
            //         name: "voir_domaine",
            //         component: ShowDomaine,
            //     },
            //     // Filières
            //     {
            //         path: "filieres",
            //         name: "liste_filieres",
            //         component: ListFilieres,
            //     },
            //     {
            //         path: "filieres/create",
            //         name: "ajouter_filiere",
            //         component: EditFiliere,
            //     },
            //     {
            //         path: "filieres/edit/:id",
            //         name: "modifier_filiere",
            //         component: EditFiliere,
            //     },
            //     {
            //         path: "filieres/:id",
            //         name: "voir_filiere",
            //         component: ShowFiliere,
            //     },
            //     // Mentions
            //     {
            //         path: "mentions",
            //         name: "liste_mentions",
            //         component: ListMentions,
            //     },
            //     {
            //         path: "mentions/create",
            //         name: "ajouter_mention",
            //         component: EditMention,
            //     },
            //     {
            //         path: "mentions/edit/:id",
            //         name: "modifier_mention",
            //         component: EditMention,
            //     },
            //     {
            //         path: "mentions/:id",
            //         name: "voir_mention",
            //         component: ShowMention,
            //     },
            //     // Promotion
            //     {
            //         path: "promotions",
            //         name: "liste_promotions",
            //         component: ListPromotions,
            //     },
            //     {
            //         path: "promotions/create",
            //         name: "ajouter_promotion",
            //         component: EditPromotion,
            //     },
            //     {
            //         path: "promotions/edit/:id",
            //         name: "modifier_promotion",
            //         component: EditPromotion,
            //     },
            //     {
            //         path: "promotions/:id",
            //         name: "voir_promotion",
            //         component: ShowPromotion,
            //     },
            //     // Mentions
            //     {
            //         path: "mentions",
            //         name: "liste_mentions",
            //         component: ListMentions,
            //     },
            //     {
            //         path: "mentions/create",
            //         name: "ajouter_mention",
            //         component: EditMention,
            //     },
            //     {
            //         path: "mentions/edit/:id",
            //         name: "modifier_mention",
            //         component: EditMention,
            //     },
            //     {
            //         path: "mentions/:id",
            //         name: "voir_mention",
            //         component: ShowMention,
            //     },
            //     // Etudiants
            //     {
            //         path: "etudiants",
            //         name: "liste_etudiants",
            //         component: ListEtudiants,
            //     },
            //     {
            //         path: "etudiants/create",
            //         name: "ajouter_etudiant",
            //         component: EditEtudiant,
            //     },
            //     {
            //         path: "etudiants/edit/:id",
            //         name: "modifier_etudiant",
            //         component: EditEtudiant,
            //     },
            //     {
            //         path: "etudiants/:id",
            //         name: "voir_etudiant",
            //         component: ShowEtudiant,
            //     },
            //     // Paiements
            //     {
            //         path: "paiements/ajouter",
            //         name: "ajouter_paiement",
            //         component: AddPaiement,
            //     },
            //     {
            //         path: "paiements",
            //         name: "liste_paiements",
            //         component: ListPaiements,
            //     },
            //     // Derogations
            //     {
            //         path: "derogations/ajouter",
            //         name: "ajouter_derogation",
            //         component: AddDerogation,
            //     },
            //     {
            //         path: "derogations",
            //         name: "liste_derogations",
            //         component: ListDerogations,
            //     },

            //     // Page d'accueil
            //     // {
            //     //     path: "",
            //     //     name: "no_path",
            //     //     redirect: { name: "all_students" },
            //     // },
            // ],
        },
    ],
});

export default router;
