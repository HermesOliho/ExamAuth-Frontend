<template>
    <h1>Promotion : {{ promotion?.nom_promotion }}</h1>
    <table v-if="promotion?.inscriptions && promotion.inscriptions.length > 0">
        <thead>
            <tr>
                <th scope="col">Date d'inscription</th>
                <th scope="col">Etudiant</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="inscription in promotion.inscriptions">
                <td>Le {{ formatDate(inscription.created_at as string) }}</td>
                <td>
                    {{ inscription.etudiant?.nom }}
                    {{ inscription.etudiant?.post_nom }}
                    {{ inscription.etudiant?.prenom ?? "" }}
                </td>
                <td style="text-align: end" class="table-actions">
                    <RouterLink
                        :to="{ name: 'modifier_promotion' }"
                        role="button"
                    >
                        Modifier
                    </RouterLink>
                    <button
                        class="secondary"
                        @click="
                            removeEtudiant(
                                inscription.etudiant_id_etudiant as number
                            )
                        "
                    >
                        Supprimer
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <hr />
    <form action="" @submit.prevent="submit" id="inscriptionForm">
        <h3>Enregistrer une nouvelle inscription</h3>
        <!-- Noms -->
        <label for="nom">
            Nom
            <input
                type="text"
                name="nom"
                id="nom"
                v-model="nouvelEtudiant.nom"
            />
        </label>
        <label for="post_nom">
            Post-nom
            <input
                type="text"
                name="post_nom"
                id="post_nom"
                v-model="nouvelEtudiant.post_nom"
            />
        </label>
        <label for="prenom">
            Prénom
            <input
                type="text"
                name="prenom"
                id="prenom"
                v-model="nouvelEtudiant.prenom"
            />
        </label>
        <!-- Matricule -->
        <label for="matricule">
            Matricule
            <input
                type="text"
                name="matricule"
                id="matricule"
                v-model="nouvelEtudiant.matricule"
            />
        </label>
        <!-- Adresse -->
        <label for="adresse">
            Adresse
            <input
                type="text"
                name="adresse"
                id="adresse"
                v-model="nouvelEtudiant.adresse"
            />
        </label>
        <!-- Lieu de naissance -->
        <label for="lieu_naissance">
            Lieu de naissance
            <input
                type="text"
                name="lieu_naissance"
                id="lieu_naissance"
                v-model="nouvelEtudiant.lieu_naissance"
            />
        </label>
        <!-- Date de naissance -->
        <label for="date_naissance">
            Date de naissance
            <input
                type="date"
                name="date_naissance"
                id="date_naissance"
                v-model="nouvelEtudiant.date_naissance"
            />
        </label>
        <!-- Sexe -->
        <label for="sexe">
            Sexe
            <select name="sexe" id="sexe">
                <option value="F">F</option>
                <option value="M">M</option>
            </select>
        </label>
        <!-- Photo de profil -->
        <label for="imageEtudiant">
            Photo de profil
            <input
                type="file"
                name="imageEtudiant"
                id="imageEtudiant"
                @change="chargerImage"
            />
        </label>
        <!-- Année académique -->
        <label for="annee_academique">
            Année académique
            <input
                type="text"
                name="annee_academique"
                id="annee_academique"
                v-model="nouvelEtudiant.annee_academique"
            />
        </label>
        <button type="submit">Enregistrer</button>
    </form>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Etudiant, Promotion } from "@/models";
import { deleteEtudiant } from "@/services/etudiantService";
import { deletePromotion, getPromotionById } from "@/services/promotionService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const apiStore = useApiStore();

const promotion = ref<Promotion>();
const route = useRoute();
const router = useRouter();
const nouvelEtudiant = ref<Etudiant>({
    matricule: "",
    nom: "",
    post_nom: "",
    prenom: "",
    adresse: "",
    sexe: "M",
    date_naissance: "",
    lieu_naissance: "",
});
const imageEtudiant = ref<any>("");

onMounted(async () => {
    const id = Number(route.params.id);
    promotion.value = await getPromotionById(`${apiStore.api}/promotions`, id);
    console.log(promotion.value);
    console.log(promotion.value?.inscriptions);
});

const submit = async () => {
    const form = <HTMLFormElement>document.getElementById("inscriptionForm");
    const data = new FormData(form);
    data.append("id_promotion", String(promotion.value?.id_promotion));
    data.append("image", imageEtudiant.value);
    if (form) {
        try {
            await axios.post(`${apiStore.api}/etudiants`, data);
            promotion.value = await getPromotionById(
                `${apiStore.api}/promotions`,
                promotion.value?.id_promotion as number
            );
            form.reset();
        } catch (error) {}
    }
};

const chargerImage = (event: Event) => {
    const element: HTMLInputElement | null = event.target;
    if (element && element.files) {
        imageEtudiant.value = element?.files[0];
    }
};

const removeEtudiant = async (id: number) => {
    const result = await deleteEtudiant(`${apiStore.api}/etudiants`, id);
    router.push({ name: "liste_promotions" });
};
</script>
