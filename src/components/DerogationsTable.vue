<template>
    <h3><a href="#">Dérogations</a></h3>
    <div class="table-responsive mb-3">
        <ul>
            <li v-for="derogation in derogations">
                Délai : du {{ formatDate(derogation.date_debut) }} au
                {{ formatDate(derogation.date_fin) }}<br />
                Motif : <strong>{{ derogation.motif }}</strong>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Derogation } from "@/models";

defineProps<{
    derogations: Derogation[];
}>();
</script>
