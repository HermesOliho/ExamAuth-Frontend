<template>
    <div>
        <h1 style="text-align: center">
            {{ editMode ? "Modifier une Promotion" : "Ajouter une Promotion" }}
        </h1>

        <!-- Formulaire pour ajouter ou modifier un promotion -->
        <form @submit.prevent="savePromotion">
            <div>
                <label for="nom_promotion">Nom du Promotion:</label>
                <input
                    id="nom_promotion"
                    v-model="promotion.nom_promotion"
                    type="text"
                    required
                    placeholder="Entrez le nom du promotion"
                />
            </div>

            <!-- Bouton pour soumettre le formulaire -->
            <button type="submit">
                {{ editMode ? "Modifier" : "Ajouter" }} Promotion
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

<script setup lang="js">
import {
    createPromotion,
    getPromotionById,
    updatePromotion,
} from "@/services/promotionService";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const promotion = ref({ nom_promotion: "" });
const editMode = ref(false); // Détermine si on est en mode édition
const error = ref(null);

const route = useRoute();
const router = useRouter();

// Charger un promotion spécifique si l'on est en mode modification
const loadPromotion = async () => {
    const promotionId = route.params.id; // On récupère l'ID du promotion depuis les paramètres de la route
    if (promotionId) {
        try {
            const data = await getPromotionById(promotionId);
            promotion.value = { nom_promotion: data.nom_promotion };
            editMode.value = true;
        } catch (err) {
            error.value = "Erreur lors de la récupération du promotion";
            console.error(err);
        }
    }
};

// Sauvegarder le promotion (ajout ou modification)
const savePromotion = async () => {
    try {
        if (editMode.value) {
            const params = new URLSearchParams();
            params.set("nom", promotion.value);
            // Mise à jour d'un promotion existant
            await updatePromotion(route.params.id, {
                nom: promotion.value.nom_promotion,
            });
        } else {
            // Ajout d'un nouveau promotion
            await createPromotion(promotion.value);
        }

        // Rediriger vers la page liste des promotions après l'opération
        router.push({ name: "liste_promotions" });
    } catch (err) {
        error.value = "Erreur lors de la sauvegarde du promotion";
        console.error(err);
    }
};

// Annuler la modification et revenir à la liste
const cancelEdit = () => {
    router.push({ name: "liste_promotions" });
};

// Charger le promotion si nous sommes en mode édition
onMounted(loadPromotion);
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
