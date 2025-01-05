<template>
    <h2>Affecter des frais académiques à une promotion pour une année</h2>
    <div :aria-busy="isLoading">
        <template v-if="fraisAcademique">
            <ul>
                <li>
                    Montant : <strong>{{ fraisAcademique.montant }} $</strong>
                </li>
                <li>
                    Échéance de paiement :
                    <strong>
                        le
                        {{
                            formatDate(fraisAcademique.echeance_paiement, false)
                        }}
                    </strong>
                </li>
                <li>
                    Semestre : <strong>{{ fraisAcademique.semestre }}</strong>
                </li>
            </ul>
            <form action="" aria-label="Chargement...">
                <!-- Promotion -->
                <label for="promotion">
                    Promotion
                    <select name="promotion" id="promotion">
                        <option value="">Sélectionner une promotion</option>
                    </select>
                </label>
                <!-- Année académique -->
                <label for="annee">
                    Année académique
                    <input
                        type="text"
                        name="annee"
                        id="annee"
                        placeholder="Année pour laquelle appliquer les frais"
                    />
                </label>
                <button type="submit">Valider</button>
            </form>
        </template>
        <div class="alert warning" v-else>Aucun frais trouvé !</div>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { FraisAcademiques } from "@/models";
import { getFraisAcademiqueById } from "@/services/fraisAcademiqueService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const idTranche = ref(0);
const isLoading = ref(true);
const route = useRoute();
const fraisAcademique = ref<FraisAcademiques>();
const apiStore = useApiStore();

const submit = () => {
    console.log("Submitted");
};

onMounted(() => {
    idTranche.value = Number(route.params.id_tranche);
    getFraisAcademiqueById(`${apiStore.api}/frais-academiques`, idTranche.value)
        .then((frais) => {
            fraisAcademique.value = frais;
            isLoading.value = false;
        })
        .catch((err) => {
            isLoading.value = false;
            console.error("Erreur :", err);
        });
});
</script>
