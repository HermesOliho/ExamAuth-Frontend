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
            <form @submit.prevent="submit" aria-label="Chargement...">
                <!-- Promotion -->
                <label for="promotion">
                    Promotion
                    <select
                        name="promotion"
                        id="promotion"
                        v-model="selectedPromo"
                    >
                        <option value="0">Sélectionner une promotion</option>
                        <option
                            v-for="promotion in promotions"
                            :value="promotion.id_promotion"
                        >
                            {{ promotion.nom_promotion }}
                        </option>
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
                        v-model="typedAcademicYear"
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
import type { FraisAcademiques, Promotion } from "@/models";
import { getFraisAcademiqueById } from "@/services/fraisAcademiqueService";
import { getPromotions } from "@/services/promotionService";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const idTranche = ref(0);
const isLoading = ref(true);
const route = useRoute();
const fraisAcademique = ref<FraisAcademiques>();
const promotions = ref<Promotion[]>([]);
const selectedPromo = ref(0);
const typedAcademicYear = ref("");
const apiStore = useApiStore();
const router = useRouter();

const submit = () => {
    const data = {
        promotion: selectedPromo.value,
        frais_academiques: fraisAcademique.value?.id_tranche,
        annee_academique: typedAcademicYear.value,
    };
    const formatAnne = /^[0-9]{4}-[0-9]{4}$/;
    if (
        data.promotion < 1 ||
        !data.frais_academiques ||
        !data.annee_academique ||
        !formatAnne.test(data.annee_academique)
    ) {
        alert("Veuillez remplir le formulaire avec des informatons valides !");
    } else {
        // Associer les frais à la promotion pour l'année académique choisie
        axios
            .post(`${apiStore.api}/promotion-frais-academiques`, data)
            .then(() => {
                router.push({ name: "liste_frais" });
            })
            .catch((err) => {
                console.error("Erreur :", err);
            });
    }
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

watch(fraisAcademique, () => {
    if (fraisAcademique.value) {
        getPromotions(`${apiStore.api}/promotions`)
            .then((promos) => {
                promotions.value = promos;
            })
            .catch((err) => {
                console.error(
                    "Erreur lors de la récupération des promotions : ",
                    err
                );
            });
    }
});
</script>
