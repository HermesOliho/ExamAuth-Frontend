<template>
    <div
        style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
        "
    >
        <h1>Liste des derogations</h1>
        <RouterLink role="button" :to="{ name: 'ajouter_derogation' }">
            Enregistrer derogation
        </RouterLink>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">Étudiant</th>
                <th scope="col">Délai/Motif</th>
                <th scope="col" style="text-align: end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="derogation in derogations">
                <td>
                    <p>
                        <strong>
                            {{ derogation.etudiant?.nom }}
                            {{ derogation.etudiant?.post_nom }}
                        </strong>
                    </p>
                </td>
                <td>
                    <p>
                        Du
                        <strong>{{ formatDate(derogation.date_debut) }}</strong>
                        au
                        <strong>{{ formatDate(derogation.date_fin) }}</strong>
                        <br />
                        <span style="font-size: 0.8em">
                            -- {{ derogation.motif }}
                        </span>
                    </p>
                </td>
                <td>
                    <div class="table-actions">
                        <button @click="removeDerogation(derogation.id)">
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
import type { Derogation } from "@/models";
import { deleteDerogation, getDerogations } from "@/services/derogationService";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref } from "vue";

const derogations = ref<Derogation[]>([]);
const apiStore = useApiStore();

const removeDerogation = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce derogation ?")) {
        await deleteDerogation(`${apiStore.api}/derogations`, id);
        derogations.value = await getDerogations(`${apiStore.api}/derogations`);
    }
};

onMounted(async () => {
    derogations.value = await getDerogations(`${apiStore.api}/derogations`);
});
</script>
