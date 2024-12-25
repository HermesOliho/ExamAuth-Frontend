<template>
    <h1>{{ mention?.nom_mention }}</h1>
    <table v-if="mention?.promotions && mention.promotions.length > 0">
        <thead>
            <tr>
                <th scope="col">Nom de la filière</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="promotion in mention.promotions">
                <td>{{ promotion.nom_promotion }}</td>
                <td style="text-align: end" class="table-actions">
                    <RouterLink
                        :to="{ name: 'modifier_promotion' }"
                        role="button"
                    >
                        Modifier
                    </RouterLink>
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
    <hr />
    <form action="" @submit.prevent="submit">
        <h3>Ajouter une promotion à la filière</h3>
        <fieldset role="group">
            <input
                type="text"
                name="promotion"
                id="promotion"
                placeholder="Nom de la filière"
                v-model="promotion"
            />
            <button>Ajouter</button>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import type { Mention } from "@/models";
import { getMentionById } from "@/services/mentionService";
import { deletePromotion, getPromotionById } from "@/services/promotionService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const mention = ref<Mention>();
const route = useRoute();
const router = useRouter();
const promotion = ref("");

const apiStore = useApiStore();

onMounted(async () => {
    const id = Number(route.params.id);
    mention.value = await getMentionById(id);
    console.log(mention.value);
});

const submit = async () => {
    try {
        const params = new URLSearchParams();
        params.set("nom", promotion.value);
        const result = await axios.post(
            `${apiStore.api}/mention/${mention.value?.id_mention}/promotions`,
            params
        );
        mention.value = await getMentionById(Number(route.params.id));
        promotion.value = "";
    } catch (error) {}
};

const removePromotion = async (id: number) => {
    const result = await deletePromotion(id);
    mention.value = await getMentionById(Number(route.params.id));
};
</script>
