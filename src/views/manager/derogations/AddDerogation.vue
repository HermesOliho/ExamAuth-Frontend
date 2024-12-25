<template>
    <h2>Enregistrer un derogation</h2>
    <form action="" @submit.prevent="submit" id="addDerogation">
        <label for="etudiant">
            Etudiant
            <select name="etudiant" id="etudiant" v-model="id_etudiant">
                <option
                    :value="etudiant.id_etudiant"
                    v-for="etudiant in etudiants"
                >
                    {{ etudiant.nom }} {{ etudiant.post_nom }}
                </option>
            </select>
        </label>
        <label for="motif">
            Motif
            <input type="text" name="motif" id="motif" step="0.5" />
        </label>
        <label for="date_debut">
            Date de début
            <input type="date" name="date_debut" id="date_debut" />
        </label>
        <label for="date_fin">
            Date de derogation
            <input type="date" name="date_fin" id="date_fin" />
        </label>
        <button type="submit">Enregistrer</button>
    </form>
</template>

<script setup lang="ts">
import type { Etudiant, Derogation } from "@/models";
import { getEtudiants } from "@/services/etudiantService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const apiStore = useApiStore();

const route = useRoute();
const router = useRouter();
const derogation = ref<Derogation>({
    id: 0,
    motif: "",
    date_debut: "",
    date_fin: "",
});
const id_etudiant = ref(0);
const etudiants = ref<Etudiant[]>();

onMounted(async () => {
    etudiants.value = await getEtudiants();
});

const submit = async () => {
    const form = <HTMLFormElement>document.getElementById("addDerogation");
    const data = new FormData(form);
    const result = await axios.post(
        `${apiStore.api}/etudiant/${id_etudiant.value}/derogations`,
        data
    );
    if (result.status == 200 || result.status == 201) {
        router.push({ name: "liste_derogations" });
    }
};
</script>
