<template>
    <h1>{{ filiere?.nom_filiere }}</h1>
    <table v-if="filiere?.mentions && filiere.mentions.length > 0">
        <thead>
            <tr>
                <th scope="col">Nom de la filière</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="mention in filiere.mentions">
                <td>{{ mention.nom_mention }}</td>
                <td style="text-align: end" class="table-actions">
                    <RouterLink
                        :to="{
                            name: 'modifier_mention',
                            params: { id: mention.id_mention },
                        }"
                        role="button"
                    >
                        Modifier
                    </RouterLink>
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
    <hr />
    <form action="" @submit.prevent="submit">
        <h3>Ajouter une mention à la filière</h3>
        <fieldset role="group">
            <input
                type="text"
                name="mention"
                id="mention"
                placeholder="Nom de la filière"
                v-model="mention"
            />
            <button>Ajouter</button>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import type { Filiere } from "@/models";
import { getFiliereById } from "@/services/filiereService";
import { deleteMention, getMentionById } from "@/services/mentionService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const filiere = ref<Filiere>();
const route = useRoute();
const router = useRouter();
const mention = ref("");

const apiStore = useApiStore();

onMounted(async () => {
    const id = Number(route.params.id);
    filiere.value = await getFiliereById(id);
    console.log(filiere.value);
});

const submit = async () => {
    try {
        const params = new URLSearchParams();
        params.set("nom", mention.value);
        const result = await axios.post(
            `${apiStore.api}/filiere/${filiere.value?.id_filiere}/mentions`,
            params
        );
        filiere.value = await getFiliereById(Number(route.params.id));
        mention.value = "";
    } catch (error) {}
};

const removeMention = async (id: number) => {
    const result = await deleteMention(id);
    filiere.value = await getFiliereById(Number(route.params.id));
};
</script>
