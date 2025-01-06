<template>
    <div>
        <img
            :src="`${apiStore.server}${student.image_url}`"
            alt="#photo"
            style="
                display: block;
                margin: 1rem auto;
                border: 1px double gray;
                border-radius: 0.25rem;
                padding: 0.25rem;
                width: 160px;
                aspect-ratio: 1/1;
                object-fit: cover;
                object-position: center;
            "
        />
    </div>
    <h2 class="text-center">Identité</h2>
    <div class="table-responsive">
        <ul>
            <li>
                Matricule : <strong>{{ student.matricule }}</strong>
            </li>
            <li>
                Nom complet :
                <strong>{{ student.nom }} {{ student.post_nom }}</strong>
            </li>
            <li>
                Date de naissance :
                <strong>{{
                    formatDate(new Date(student.date_naissance))
                }}</strong>
            </li>
            <li>
                Promotion : <strong>{{ student.promotion }}</strong>
            </li>
            <li>
                Année académique :
                <strong>{{ student.annee_academique }}</strong>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Etudiant } from "@/models";
import { useApiStore } from "@/stores/apiStore";

const apiStore = useApiStore();

defineProps<{
    student: Etudiant;
}>();
</script>
