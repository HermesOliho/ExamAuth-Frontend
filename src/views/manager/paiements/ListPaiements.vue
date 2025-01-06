<template>
    <div
        style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
        "
    >
        <h1>Liste des paiements</h1>
        <RouterLink role="button" :to="{ name: 'ajouter_paiement' }">
            Enregistrer paiement
        </RouterLink>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">Date/Etudiant</th>
                <th scope="col">Montant</th>
                <th scope="col">N° bordereau</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="paiement in paiements">
                <td>
                    <p>
                        Le
                        <strong>{{
                            formatDate(paiement.date_paiement)
                        }}</strong>
                        par
                        <strong>
                            {{ paiement.etudiant?.nom }}
                            {{ paiement.etudiant?.post_nom }}
                        </strong>
                    </p>
                </td>
                <td>{{ paiement.montant }}$</td>
                <td>{{ paiement.num_bordereau }}</td>
                <td>
                    <div class="table-actions">
                        <button @click="removePaiement(paiement.id_paiement)">
                            Supprimer
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Paiement } from "@/models";
import { deletePaiement, getPaiements } from "@/services/paiementService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";

const paiements = ref<Paiement[]>([]);
const apiStore = useApiStore();

const removePaiement = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce paiement ?")) {
        await deletePaiement(`${apiStore.api}/paiements`, id);
        paiements.value = await getPaiements(`${apiStore.api}/paiements`);
    }
};

onMounted(async () => {
    paiements.value = await getPaiements(`${apiStore.api}/paiements`);
});
</script>
