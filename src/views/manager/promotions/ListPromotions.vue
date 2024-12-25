<template>
    <div>
        <h1>Liste des Promotions</h1>

        <!-- Bouton pour ajouter un nouveau promotion -->
        <!-- <router-link :to="{ name: 'ajouter_promotion' }">
            <button class="add-button">Ajouter un Promotion</button>
        </router-link> -->

        <!-- Table pour afficher les promotions -->
        <table v-if="promotions.length > 0">
            <thead>
                <tr>
                    <th>Nom de la Promotion</th>
                    <th style="text-align: end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="promotion in promotions"
                    :key="promotion.id_promotion"
                >
                    <td>
                        <p
                            class="nom-promotion"
                            @click="
                                router.push({
                                    name: 'voir_promotion',
                                    params: { id: promotion.id_promotion },
                                })
                            "
                        >
                            {{ promotion.nom_promotion }}
                            <sub style="font-size: 0.8em; color: gray">
                                ({{ promotion.mention?.nom_mention }})
                            </sub>
                        </p>
                    </td>
                    <td style="text-align: end" class="table-actions">
                        <router-link
                            role="button"
                            :to="{
                                name: 'modifier_promotion',
                                params: { id: promotion.id_promotion },
                            }"
                        >
                            <button>Editer</button>
                        </router-link>
                        <button
                            class="secondary"
                            @click="removePromotion(promotion.id_promotion)"
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Message lorsqu'il n'y a pas de promotions -->
        <p v-else>Aucun promotion trouvé.</p>
    </div>
</template>

<script setup lang="ts">
import type { Promotion } from "@/models";
import { deletePromotion, getPromotions } from "@/services/promotionService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const promotions = ref<Promotion[]>([]);
const router = useRouter();
const apiStore = useApiStore();

// Fonction pour charger la liste des promotions
const loadPromotions = async () => {
    try {
        const data = await getPromotions(`${apiStore.api}/promotions`);
        promotions.value = data;
    } catch (err) {
        console.error("Erreur lors du chargement des promotions:", err);
    }
};

// Fonction pour supprimer un promotion
const removePromotion = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce promotion ?")) {
        try {
            await deletePromotion(`${apiStore.api}/promotions`, id);
            promotions.value = promotions.value.filter(
                (promotion) => promotion.id_promotion !== id
            );
        } catch (err) {
            console.error("Erreur lors de la suppression du promotion:", err);
        }
    }
};

// Charger la liste des promotions au montage du composant
onMounted(loadPromotions);
</script>

<style scoped>
h1 {
    text-align: center;
}
.nom-promotion:hover {
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
