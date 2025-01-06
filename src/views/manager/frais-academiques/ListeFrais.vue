<template>
    <div
        style="
            display: flex;
            align-items: center;
            justify-content: space-between;
        "
    >
        <h1>Frais académiques</h1>
        <RouterLink :to="{ name: 'ajouter_frais' }" role="button">
            Ajouter des frais
        </RouterLink>
    </div>
    <hr />
    <!-- Recherche -->
    <form role="search">
        <input
            type="search"
            name="find"
            id="searchField"
            placeholder="Trouver rapidement des frais académiques..."
            v-model.trim="searchQuery"
        />
    </form>
    <!-- Tableau des frais académiques -->
    <table v-if="fraisVisibles.length > 0">
        <thead>
            <tr>
                <th scope="col">Montant</th>
                <th scope="col">Semestre</th>
                <th scope="col">Échéance de paiement</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="frais in fraisVisibles">
                <td>{{ frais.montant }} $</td>
                <td>{{ frais.semestre }}</td>
                <td>Le {{ formatDate(frais.echeance_paiement, false) }}</td>
                <td>
                    <div class="table-actions">
                        <RouterLink
                            :to="{
                                name: 'frais_to_promotion',
                                params: { id_tranche: frais.id_tranche },
                            }"
                            title="Assigner à une promotion"
                            role="button"
                        >
                            Assigner
                        </RouterLink>
                        <button
                            class="secondary"
                            @click="supprimerFrais(frais.id_tranche)"
                        >
                            Supprimer
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="alert" v-else>Aucun frais trouvé !</div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { FraisAcademiques } from "@/models";
import {
    deleteFraisAcademiques,
    getFraisAcademiques,
} from "@/services/fraisAcademiqueService";
import { useApiStore } from "@/stores/apiStore";
import { computed, onMounted, ref } from "vue";

const apiStore = useApiStore();
const frais_academiques = ref<FraisAcademiques[]>([]);
const searchQuery = ref("");

const fraisVisibles = computed(() => {
    if (!searchQuery.value) return frais_academiques.value;
    return frais_academiques.value.filter((frais) => {
        return (
            frais.montant.toString().includes(searchQuery.value) ||
            formatDate(frais.echeance_paiement).includes(searchQuery.value)
        );
    });
});

const chargerFrais = async () => {
    frais_academiques.value = await getFraisAcademiques(
        `${apiStore.api}/frais-academiques`
    );
};

const supprimerFrais = (id: number) => {
    if (confirm("Voulez-vous vrais supprimer ces frais académiques ?")) {
        deleteFraisAcademiques(`${apiStore.api}/frais-academiques`, id).then(
            () => {
                chargerFrais();
            }
        );
    }
};

onMounted(() => {
    chargerFrais();
});
</script>
