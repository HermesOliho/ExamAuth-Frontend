<template>
    <div>
        <h1>Liste des Mentions</h1>

        <!-- Bouton pour ajouter un nouveau mention -->
        <!-- <router-link :to="{ name: 'ajouter_mention' }">
            <button class="add-button">Ajouter un Mention</button>
        </router-link> -->

        <!-- Table pour afficher les mentions -->
        <table v-if="mentions.length > 0">
            <thead>
                <tr>
                    <th>Nom du Mention</th>
                    <th style="text-align: end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="mention in mentions" :key="mention.id_mention">
                    <td>
                        <p
                            class="nom-mention"
                            @click="
                                router.push({
                                    name: 'voir_mention',
                                    params: { id: mention.id_mention },
                                })
                            "
                        >
                            {{ mention.nom_mention }}
                            <sub style="font-size: 0.8em; color: gray">
                                ({{ mention.filiere?.nom_filiere }})
                            </sub>
                        </p>
                    </td>
                    <td style="text-align: end" class="table-actions">
                        <router-link
                            role="button"
                            :to="{
                                name: 'modifier_mention',
                                params: { id: mention.id_mention },
                            }"
                        >
                            <button>Editer</button>
                        </router-link>
                        <button
                            class="secondary"
                            @click="removeMention(mention.id_mention)"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Message lorsqu'il n'y a pas de mentions -->
        <p v-else>Aucun mention trouvé.</p>
    </div>
</template>

<script setup lang="ts">
import type { Mention } from "@/models";
import { deleteMention, getMentions } from "@/services/mentionService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const mentions = ref<Mention[]>([]);
const router = useRouter();
const apiStore = useApiStore();

// Fonction pour charger la liste des mentions
const loadMentions = async () => {
    try {
        const data = await getMentions(`${apiStore.api}/mentions`);
        mentions.value = data;
    } catch (err) {
        console.error("Erreur lors du chargement des mentions:", err);
    }
};

// Fonction pour supprimer un mention
const removeMention = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce mention ?")) {
        try {
            await deleteMention(`${apiStore.api}/mentions`, id);
            mentions.value = mentions.value.filter(
                (mention) => mention.id_mention !== id
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du mention:", err);
        }
    }
};

// Charger la liste des mentions au montage du composant
onMounted(loadMentions);
</script>

<style scoped>
h1 {
    text-align: center;
}
.nom-mention:hover {
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
