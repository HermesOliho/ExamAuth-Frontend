<template>
    <h1>{{ domaine?.nom_domaine }}</h1>
    <table v-if="domaine?.filieres && domaine.filieres.length > 0">
        <thead>
            <tr>
                <th scope="col">Nom de la filière</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="filiere in domaine.filieres">
                <td>{{ filiere.nom_filiere }}</td>
                <td style="text-align: end" class="table-actions">
                    <RouterLink
                        :to="{
                            name: 'modifier_filiere',
                            params: { id: filiere.id_filiere },
                        }"
                        role="button"
                        >Modifier</RouterLink
                    >
                    <button
                        class="secondary"
                        @click="removeFiliere(filiere.id_filiere)"
                    >
                        Supprimer
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <hr />
    <form action="" @submit.prevent="submit">
        <h3>Ajouter une filière à la faculté</h3>
        <fieldset role="group">
            <input
                type="text"
                name="filiere"
                id="filiere"
                placeholder="Nom de la filière"
                v-model="filiere"
            />
            <button>Ajouter</button>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import type { Domaine } from "@/models";
import { getDomaineById } from "@/services/domaineService";
import { deleteFiliere } from "@/services/filiereService";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApiStore } from "@/stores/apiStore";

const domaine = ref<Domaine>();
const route = useRoute();
const router = useRouter();
const filiere = ref("");

const apiStore = useApiStore();

onMounted(async () => {
    const id = Number(route.params.id);
    domaine.value = await getDomaineById(apiStore.api + "/domaines", id);
    console.log(domaine.value);
});

const submit = async () => {
    try {
        const params = new URLSearchParams();
        params.set("nom", filiere.value);
        const result = await axios.post(
            `${apiStore.api}/domaine/${domaine.value?.id_domaine}/filieres`,
            params
        );
        domaine.value = await getDomaineById(
            apiStore.api + "/domaines",
            Number(route.params.id)
        );
        filiere.value = "";
    } catch (error) {}
};

const removeFiliere = async (id: number) => {
    const result = await deleteFiliere(apiStore.api + "/filieres", id);
    domaine.value = await getDomaineById(
        apiStore.api + "/domaines",
        Number(route.params.id)
    );
};
</script>
