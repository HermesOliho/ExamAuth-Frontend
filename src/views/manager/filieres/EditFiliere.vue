<template>
    <div>
        <h1 style="text-align: center">
            {{ editMode ? "Modifier une Filière" : "Ajouter une Filière" }}
        </h1>

        <!-- Formulaire pour ajouter ou modifier un filiere -->
        <form @submit.prevent="saveFiliere">
            <div>
                <label for="nom_filiere">Nom du Filière:</label>
                <input
                    id="nom_filiere"
                    v-model="filiere.nom_filiere"
                    type="text"
                    required
                    placeholder="Entrez le nom du filiere"
                />
            </div>

            <!-- Bouton pour soumettre le formulaire -->
            <button type="submit">
                {{ editMode ? "Modifier" : "Ajouter" }} Filiere
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
    createFiliere,
    getFiliereById,
    updateFiliere,
} from "@/services/filiereService";
import { useApiStore } from "@/stores/apiStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const filiere = ref({ nom_filiere: "" });
const editMode = ref(false); // Détermine si on est en mode édition
const error = ref(null);

const route = useRoute();
const router = useRouter();
const apiStore = useApiStore();

// Charger un filiere spécifique si l'on est en mode modification
const loadFiliere = async () => {
    const filiereId = route.params.id; // On récupère l'ID du filiere depuis les paramètres de la route
    if (filiereId) {
        try {
            const data = await getFiliereById(
                `${apiStore.api}/filieres`,
                filiereId
            );
            filiere.value = { nom_filiere: data.nom_filiere };
            editMode.value = true;
        } catch (err) {
            error.value = "Erreur lors de la récupération du filiere";
            console.error(err);
        }
    }
};

// Sauvegarder le filiere (ajout ou modification)
const saveFiliere = async () => {
    try {
        if (editMode.value) {
            const params = new URLSearchParams();
            params.set("nom", filiere.value);
            // Mise à jour d'un filiere existant
            await updateFiliere(
                `${apiStore.api}/filieres`,
                route.params.id,
                params
            );
        } else {
            // Ajout d'un nouveau filiere
            await createFiliere(`${apiStore.api}/filieres`, filiere.value);
        }

        // Rediriger vers la page liste des filieres après l'opération
        router.push({ name: "liste_filieres" });
    } catch (err) {
        error.value = "Erreur lors de la sauvegarde du filiere";
        console.error(err);
    }
};

// Annuler la modification et revenir à la liste
const cancelEdit = () => {
    router.push({ name: "liste_filieres" });
};

// Charger le filiere si nous sommes en mode édition
onMounted(loadFiliere);
</script>

<style scoped>
form {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #cccccc41;
    border-radius: 8px;
    background-color: #2527332a;
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
