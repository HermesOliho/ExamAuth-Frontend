<template>
    <div>
        <h1>Liste des Filieres</h1>

        <!-- Bouton pour ajouter un nouveau filiere -->
        <!-- <router-link :to="{ name: 'ajouter_filiere' }">
            <button class="add-button">Ajouter un Filiere</button>
        </router-link> -->

        <!-- Table pour afficher les filieres -->
        <table v-if="filieres.length > 0">
            <thead>
                <tr>
                    <th>Nom du Filiere</th>
                    <th style="text-align: end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="filiere in filieres" :key="filiere.id_filiere">
                    <td>
                        <p
                            class="nom-filiere"
                            @click="
                                router.push({
                                    name: 'voir_filiere',
                                    params: { id: filiere.id_filiere },
                                })
                            "
                        >
                            {{ filiere.nom_filiere }}
                            <sub style="font-size: 0.8em; color: gray">
                                ({{ filiere.domaine?.nom_domaine }})
                            </sub>
                        </p>
                    </td>
                    <td style="text-align: end" class="table-actions">
                        <router-link
                            role="button"
                            :to="{
                                name: 'modifier_filiere',
                                params: { id: filiere.id_filiere },
                            }"
                        >
                            <button>Editer</button>
                        </router-link>
                        <button
                            class="secondary"
                            @click="removeFiliere(filiere.id_filiere)"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Message lorsqu'il n'y a pas de filieres -->
        <p v-else>Aucun filiere trouvé.</p>
    </div>
</template>

<script setup lang="ts">
import type { Filiere } from "@/models";
import { deleteFiliere, getFilieres } from "@/services/filiereService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const filieres = ref<Filiere[]>([]);
const router = useRouter();

// Fonction pour charger la liste des filieres
const loadFilieres = async () => {
    try {
        const data = await getFilieres();
        filieres.value = data;
    } catch (err) {
        console.error("Erreur lors du chargement des filieres:", err);
    }
};

// Fonction pour supprimer un filiere
const removeFiliere = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce filiere ?")) {
        try {
            await deleteFiliere(id);
            filieres.value = filieres.value.filter(
                (filiere) => filiere.id_filiere !== id
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du filiere:", err);
        }
    }
};

// Charger la liste des filieres au montage du composant
onMounted(loadFilieres);
</script>

<style scoped>
h1 {
    text-align: center;
}
.nom-filiere:hover {
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

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
</style>
