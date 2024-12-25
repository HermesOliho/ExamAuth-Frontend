<template>
    <div>
        <h1 style="text-align: center">
            {{ editMode ? "Modifier une Filière" : "Ajouter une Filière" }}
        </h1>

        <!-- Formulaire pour ajouter ou modifier un mention -->
        <EditForm>
            <form @submit.prevent="saveMention">
                <div>
                    <label for="nom_mention">Nom du Filière:</label>
                    <input
                        id="nom_mention"
                        v-model="mention.nom_mention"
                        type="text"
                        required
                        placeholder="Entrez le nom du mention"
                    />
                </div>

                <!-- Bouton pour soumettre le formulaire -->
                <button type="submit">
                    {{ editMode ? "Modifier" : "Ajouter" }} Mention
                </button>

                <!-- Bouton pour annuler la modification et revenir à la liste -->
                <button @click="cancelEdit" type="button" v-if="editMode">
                    Annuler
                </button>
            </form>
        </EditForm>

        <!-- Message d'erreur -->
        <p v-if="error" class="error-message">Erreur: {{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import EditForm from "@/components/EditForm.vue";
import {
    createMention,
    getMentionById,
    updateMention,
} from "@/services/mentionService";
import { useApiStore } from "@/stores/apiStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const mention = ref({ nom_mention: "" });
const editMode = ref(false); // Détermine si on est en mode édition
const error = ref(null);

const route = useRoute();
const router = useRouter();
const apiStore = useApiStore();

// Charger un mention spécifique si l'on est en mode modification
const loadMention = async () => {
    const mentionId = Number(route.params.id); // On récupère l'ID du mention depuis les paramètres de la route
    if (mentionId) {
        try {
            const data = await getMentionById(
                `${apiStore.api}/mentions`,
                mentionId
            );
            mention.value = { nom_mention: data.nom_mention };
            editMode.value = true;
        } catch (err) {
            // error.value = "Erreur lors de la récupération du mention";
            console.error("Erreur lors de la récupération du mention", err);
        }
    }
};

// Sauvegarder le mention (ajout ou modification)
const saveMention = async () => {
    try {
        if (editMode.value) {
            const params = new URLSearchParams();
            params.set("nom", mention.value.nom_mention);
            // Mise à jour d'un mention existant
            await updateMention(
                `${apiStore.api}/mentions`,
                Number(route.params.id),
                {
                    nom: mention.value.nom_mention,
                }
            );
        } else {
            // Ajout d'un nouveau mention
            await createMention(`${apiStore.api}/mentions`, {
                ...mention.value,
                id_mention: 0,
                filiere_id: 0,
            });
        }

        // Rediriger vers la page liste des mentions après l'opération
        router.push({ name: "liste_mentions" });
    } catch (err) {
        error.value = "Erreur lors de la sauvegarde du mention";
        console.error(err);
    }
};

// Annuler la modification et revenir à la liste
const cancelEdit = () => {
    router.push({ name: "liste_mentions" });
};

// Charger le mention si nous sommes en mode édition
onMounted(loadMention);
</script>
