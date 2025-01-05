<template>
    <h3 class="text-center">Dérogations</h3>
    <div class="table-responsive mb-3">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Délai</th>
                    <th scope="col" class="text-end">Motif</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(derogation, index) in derogations"
                    :key="derogation.id + '_' + derogation.motif"
                >
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        Du
                        <strong>{{ formatDate(derogation.date_debut) }}</strong>
                        au
                        <strong>{{ formatDate(derogation.date_fin) }}</strong>
                    </td>
                    <td class="text-end">{{ derogation.motif }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Derogation } from "@/models";

const props = defineProps<{
    derogations: Derogation[];
}>();
</script>
