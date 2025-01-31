<template>
    <div>
        <h1>Liste des Etudiants</h1>

        <!-- Bouton pour ajouter un nouveau etudiant -->
        <!-- <router-link :to="{ name: 'ajouter_etudiant' }">
            <button class="add-button">Ajouter un Etudiant</button>
        </router-link> -->

        <!-- Table pour afficher les etudiants -->
        <table v-if="etudiants.length > 0">
            <thead>
                <tr>
                    <th scope="col">Photo et nom de l'étudiant</th>
                    <th scope="col">Sexe</th>
                    <th style="text-align: end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="etudiant in etudiants" :key="etudiant.id_etudiant">
                    <td>
                        <p
                            class="nom-etudiant"
                            @click="
                                router.push({
                                    name: 'voir_etudiant',
                                    params: { id: etudiant.id_etudiant },
                                })
                            "
                        >
                            {{ etudiant.nom }} {{ etudiant.post_nom }}
                            <sub style="font-size: 0.8em; color: gray">
                                ({{
                                    etudiant.inscriptions
                                        ? etudiant.inscriptions[0].promotion
                                              .nom_promotion
                                        : ""
                                }})
                            </sub>
                        </p>
                    </td>
                    <td>{{ etudiant.sexe }}</td>
                    <td style="text-align: end">
                        <div class="table-actions">
                            <router-link
                                role="button"
                                :to="{
                                    name: 'ajouter_paiement',
                                }"
                            >
                                + paiement
                            </router-link>
                            <router-link
                                class="secondary"
                                role="button"
                                :to="{
                                    name: 'ajouter_derogation',
                                }"
                            >
                                + dérogation
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Message lorsqu'il n'y a pas de etudiants -->
        <p v-else>Aucun etudiant trouvé.</p>
    </div>
</template>

<script setup lang="ts">
import type { Etudiant } from "@/models";
import { deleteEtudiant, getEtudiants } from "@/services/etudiantService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const etudiants = ref<Etudiant[]>([]);
const router = useRouter();
const apiStore = useApiStore();

// Fonction pour charger la liste des etudiants
const loadEtudiants = async () => {
    try {
        const data = await getEtudiants(`${apiStore.api}/etudiants`);
        etudiants.value = data;
    } catch (err) {
        console.error("Erreur lors du chargement des etudiants:", err);
    }
};

// Fonction pour supprimer un etudiant
const removeEtudiant = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce etudiant ?")) {
        try {
            await deleteEtudiant(`${apiStore.api}/etudiants`, id);
            etudiants.value = etudiants.value.filter(
                (etudiant) => etudiant.id_etudiant !== id
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du etudiant:", err);
        }
    }
};

// Charger la liste des etudiants au montage du composant
onMounted(loadEtudiants);
</script>

<style scoped>
h1 {
    text-align: center;
}
.nom-etudiant:hover {
    text-decoration: underline;
    cursor: pointer;
}

.add-button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.add-button:hover {
    background-color: #45a049;
}
</style>
