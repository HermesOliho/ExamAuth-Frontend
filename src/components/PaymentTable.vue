<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Étudiant</th>
                <th scope="col">Montant</th>
                <th scope="col">Date de paiement</th>
                <th scope="col">Motif</th>
                <th scope="col">Méthode</th>
                <th scope="col" class="text-end">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="payment in payments">
                <td scope="row">{{ payment.id }}</td>
                <td>{{ payment.full_name }}</td>
                <td>{{ payment.amount }} $</td>
                <td>{{ formatDate(undefined, payment.payment_date) }}</td>
                <td>{{ payment.reference }}</td>
                <td>{{ payment.payment_method }}</td>
                <td>
                    <div class="table-actions">
                        <a href="#" role="button">Voir</a>
                        <a href="#" role="button" class="contrast">Éditer</a>
                        <a href="#" role="button" class="secondary">
                            Supprimer
                        </a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";

defineProps<{
    payments: any[];
}>();
</script>
