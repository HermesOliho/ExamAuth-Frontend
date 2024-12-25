<template>
    <div>
        <h1 style="text-align: center">
            {{ editMode ? "Modifier un Domaine" : "Ajouter un Domaine" }}
        </h1>

        <!-- Formulaire pour ajouter ou modifier un domaine -->
        <form @submit.prevent="saveDomaine">
            <div>
                <label for="nom_domaine">Nom du Domaine:</label>
                <input
                    id="nom_domaine"
                    v-model="domaine.nom_domaine"
                    type="text"
                    required
                    placeholder="Entrez le nom du domaine"
                />
            </div>

            <!-- Bouton pour soumettre le formulaire -->
            <button type="submit">
                {{ editMode ? "Modifier" : "Ajouter" }} Domaine
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

<script setup lang="ts">
import {
    createDomaine,
    getDomaineById,
    updateDomaine,
} from "@/services/domaineService";
import { useApiStore } from "@/stores/apiStore";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const domaine = ref({ nom_domaine: "" });
const editMode = ref(false); // Détermine si on est en mode édition
const error = ref(null);

const route = useRoute();
const router = useRouter();
const apiStore = useApiStore();

// Charger un domaine spécifique si l'on est en mode modification
const loadDomaine = async () => {
    const domaineId = Number(route.params.id); // On récupère l'ID du domaine depuis les paramètres de la route
    if (domaineId) {
        try {
            const data = await getDomaineById(
                apiStore.api + "/domaines",
                domaineId
            );
            domaine.value = { nom_domaine: data.nom_domaine };
            editMode.value = true;
        } catch (err) {
            // error.value = "Erreur lors de la récupération du domaine";
            console.error("Erreur lors de la récupération du domaine", err);
        }
    }
};

// Sauvegarder le domaine (ajout ou modification)
const saveDomaine = async () => {
    try {
        if (editMode.value) {
            // Mise à jour d'un domaine existant
            await updateDomaine(
                apiStore.api + "/domaines",
                Number(route.params.id),
                { ...domaine.value, id_domaine: 0 }
            );
        } else {
            // Ajout d'un nouveau domaine
            await createDomaine(apiStore.api + "/domaines", {
                ...domaine.value,
                id_domaine: 0,
            });
        }

        // Rediriger vers la page liste des domaines après l'opération
        router.push({ name: "liste_domaines" });
    } catch (err) {
        // error.value = "Erreur lors de la sauvegarde du domaine";
        console.error("Erreur lors de la sauvegarde du domaine", err);
    }
};

// Annuler la modification et revenir à la liste
const cancelEdit = () => {
    router.push({ name: "domaines-list" });
};

// Charger le domaine si nous sommes en mode édition
onMounted(loadDomaine);
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
