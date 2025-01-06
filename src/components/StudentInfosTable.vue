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
    <div class="table-responsive">
        <table class="table">
            <!-- <thead>
                <tr>
                    <th scope="col"><h3>Information</h3></th>
                    <th scope="col"><h3>Valeur</h3></th>
                </tr>
            </thead> -->
            <tbody>
                <tr class="">
                    <td>Matricule :</td>
                    <td class="fw-bold">{{ student.matricule }}</td>
                </tr>
                <tr class="">
                    <td>Nom complet :</td>
                    <td class="fw-bold">
                        {{ student.nom }}
                        {{ student.post_nom }}
                    </td>
                </tr>
                <tr class="">
                    <td>Date de naissance :</td>
                    <td class="fw-bold">
                        Le
                        {{ formatDate(new Date(student.date_naissance)) }}
                    </td>
                </tr>
                <tr class="">
                    <td>Promotion :</td>
                    <td class="fw-bold">{{ student.promotion }}</td>
                </tr>
                <tr class="">
                    <td>Année académique :</td>
                    <td class="fw-bold">{{ student.annee_academique }}</td>
                </tr>
                <tr class="">
                    <td>Solde</td>
                    <td class="fw-bold">
                        <strong>{{ student.solde_paiment }}$</strong>
                    </td>
                </tr>
                <tr class="">
                    <td>Frais de la promotion</td>
                    <td class="fw-bold">
                        <ul>
                            <li v-for="frais in student.frais_promotion">
                                <span>{{ frais.semestre }} : </span>
                                <strong>{{ frais.montant }}$</strong>
                                <sub
                                    >à payer le
                                    {{
                                        formatDate(
                                            frais.echeance_paiement,
                                            false
                                        )
                                    }}</sub
                                >
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
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
