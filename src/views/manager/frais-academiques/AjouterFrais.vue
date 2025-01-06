<template>
    <h1>Ajouter des frais académiques</h1>
    <hr />
    <form @submit.prevent="submit">
        <label for="montant">
            Montant à payer
            <input
                type="number"
                name="montant"
                id="montant"
                v-model="nouveauxFrais.montant"
            />
        </label>
        <label for="echeance">
            Échéance de paiement
            <input
                type="date"
                name="echeance"
                id="echeance"
                v-model="nouveauxFrais.echeance_paiement"
            />
        </label>
        <label for="semestre">
            Semestre
            <input
                type="text"
                name="semestre"
                id="semestre"
                v-model="nouveauxFrais.semestre"
                placeholder="=> 'Premier' ou 'Second' semestre"
            />
        </label>
        <button type="submit">Valider</button>
    </form>
</template>

<script setup lang="ts">
import type { FraisAcademiques } from "@/models";
import { createFraisAcademique } from "@/services/fraisAcademiqueService";
import { useApiStore } from "@/stores/apiStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const nouveauxFrais = ref<FraisAcademiques>({
    id_tranche: 0,
    montant: 0,
    echeance_paiement: "",
    semestre: "",
});
const apiStore = useApiStore();
const router = useRouter();

const submit = () => {
    createFraisAcademique(
        `${apiStore.api}/frais-academiques`,
        nouveauxFrais.value
    ).then(() => {
        router.push({ name: "liste_frais" });
    });
};
</script>
