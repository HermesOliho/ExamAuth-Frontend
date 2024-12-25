<template>
    <div>
        <h1 style="text-align: center">
            {{ editMode ? "Modifier une Filière" : "Ajouter une Filière" }}
        </h1>

        <!-- Formulaire pour ajouter ou modifier un mention -->
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

        <!-- Message d'erreur -->
        <p v-if="error" class="error-message">Erreur: {{ error }}</p>
    </div>
</template>

<script setup>
import {
    createMention,
    getMentionById,
    updateMention,
} from "@/services/mentionService";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const mention = ref({ nom_mention: "" });
const editMode = ref(false); // Détermine si on est en mode édition
const error = ref(null);

const route = useRoute();
const router = useRouter();

// Charger un mention spécifique si l'on est en mode modification
const loadMention = async () => {
    const mentionId = route.params.id; // On récupère l'ID du mention depuis les paramètres de la route
    if (mentionId) {
        try {
            const data = await getMentionById(mentionId);
            mention.value = { nom_mention: data.nom_mention };
            editMode.value = true;
        } catch (err) {
            error.value = "Erreur lors de la récupération du mention";
            console.error(err);
        }
    }
};

// Sauvegarder le mention (ajout ou modification)
const saveMention = async () => {
    try {
        if (editMode.value) {
            const params = new URLSearchParams();
            params.set("nom", mention.value);
            // Mise à jour d'un mention existant
            await updateMention(route.params.id, {
                nom: mention.value.nom_mention,
            });
        } else {
            // Ajout d'un nouveau mention
            await createMention(mention.value);
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

<style scoped>
form {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

button[type="button"] {
    background-color: #f44336;
}

button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    font-weight: bold;
    margin-top: 15px;
}
</style>
