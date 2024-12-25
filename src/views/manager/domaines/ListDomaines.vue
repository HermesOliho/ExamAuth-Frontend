<template>
    <div>
        <h1>Domaines de l'université</h1>

        <!-- Bouton pour ajouter un nouveau domaine -->
        <router-link :to="{ name: 'ajouter_domaine' }">
            <button class="add-button">Ajouter un Domaine</button>
        </router-link>

        <!-- Table pour afficher les domaines -->
        <table v-if="domaines.length > 0">
            <thead>
                <tr>
                    <th>Nom du Domaine</th>
                    <th style="text-align: end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="domaine in domaines" :key="domaine.id_domaine">
                    <td>
                        <span
                            class="nom-domaine"
                            @click="
                                router.push({
                                    name: 'voir_domaine',
                                    params: { id: domaine.id_domaine },
                                })
                            "
                        >
                            {{ domaine.nom_domaine }}
                        </span>
                    </td>
                    <td style="text-align: end" class="table-actions">
                        <router-link
                            role="button"
                            :to="{
                                name: 'modifier_domaine',
                                params: { id: domaine.id_domaine },
                            }"
                        >
                            <button>Editer</button>
                        </router-link>
                        <button
                            class="secondary"
                            @click="removeDomaine(domaine.id_domaine)"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Message lorsqu'il n'y a pas de domaines -->
        <p v-else>Aucun domaine trouvé.</p>
    </div>
</template>

<script setup lang="ts">
import type { Domaine } from "@/models";
import { deleteDomaine, getDomaines } from "@/services/domaineService";
import { useApiStore } from "@/stores/apiStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const domaines = ref<Domaine[]>([]);
const router = useRouter();
const apiStore = useApiStore();

// Fonction pour charger la liste des domaines
const loadDomaines = async () => {
    try {
        const data = await getDomaines(`${apiStore.api}/domaines`);
        domaines.value = data;
    } catch (err) {
        console.error("Erreur lors du chargement des domaines:", err);
    }
};

// Fonction pour supprimer un domaine
const removeDomaine = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce domaine ?")) {
        try {
            await deleteDomaine(`${apiStore.api}/domaines`, id);
            domaines.value = domaines.value.filter(
                (domaine) => domaine.id_domaine !== id
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du domaine:", err);
        }
    }
};

// Charger la liste des domaines au montage du composant
onMounted(loadDomaines);
</script>

<style scoped>
h1 {
    text-align: center;
}
.nom-domaine:hover {
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
