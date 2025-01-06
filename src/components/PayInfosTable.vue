<template>
    <h3><a href="#">Paiements</a></h3>
    <div class="table-responsive mb-3">
        <!-- Infos générales -->
        <ul>
            <li>
                Total payé : <strong>{{ etudiant.total_paiement }} $</strong>
            </li>
            <li>
                Total frais : <strong>{{ etudiant.total_frais }} $</strong>
            </li>
            <li>
                Solde restant : <strong>{{ etudiant.solde_paiment }} $</strong>
            </li>
        </ul>
        <hr />
        <!-- Paiements -->
        <h4>Détails paiements</h4>
        <ul>
            <li v-for="paiement in etudiant.paiements">
                Date de paiement
                <strong>{{ formatDate(paiement.date_paiement) }}</strong
                ><br />
                Montant payé : <strong>{{ paiement.montant }}$</strong><br />
                <em>Numéro bordereau</em> :
                <em>{{ paiement.num_bordereau }}</em>
            </li>
        </ul>
        <hr />
        <!-- Frais académiques -->
        <h4>Détails frais académique</h4>
        <ul>
            <li v-for="frais in etudiant.frais_promotion">
                {{ frais.semestre }} : <strong>{{ frais.montant }}$</strong>
                <sub>
                    Au plus tard le
                    <strong>{{
                        formatDate(frais.echeance_paiement, false)
                    }}</strong>
                </sub>
            </li>
        </ul>
        <hr />
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Etudiant } from "@/models";

const props = defineProps<{
    etudiant: Etudiant;
}>();
</script>
