<template>
    <h2>Enregistrer un paiement</h2>
    <form action="" @submit.prevent="submit" id="addPaiement">
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
        <label for="montant">
            Montant
            <input type="number" name="montant" id="montant" step="0.5" />
        </label>
        <label for="num_bordereau">
            N° bordereau
            <input type="text" name="num_bordereau" id="num_bordereau" />
        </label>
        <label for="date_paiement">
            Date de paiement
            <input type="date" name="date_paiement" id="date_paiement" />
        </label>
        <button type="submit">Enregistrer</button>
    </form>
</template>

<script setup lang="ts">
import type { Etudiant, Paiement } from "@/models";
import { getEtudiants } from "@/services/etudiantService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const paiement = ref<Paiement>({
    id_paiement: 0,
    montant: 0,
    num_bordereau: "",
    date_paiement: "",
});
const id_etudiant = ref(0);
const etudiants = ref<Etudiant[]>();

const apiStore = useApiStore();

onMounted(async () => {
    etudiants.value = await getEtudiants();
});

const submit = async () => {
    const form = <HTMLFormElement>document.getElementById("addPaiement");
    const data = new FormData(form);
    const result = await axios.post(
        `${apiStore.api}/etudiant/${id_etudiant.value}/paiements`,
        data
    );
    if (result.status == 200 || result.status == 201) {
        router.push({ name: "liste_paiements" });
    }
};
</script>
