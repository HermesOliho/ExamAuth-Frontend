<template>
    <h3 class="text-center">Paiements</h3>
    <div class="table-responsive mb-3">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col" class="text-end">Montant</th>
                    <th scope="col">N° bordereau</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="paiement in paiements"
                    :key="paiement.id_paiement + '_' + paiement.date_paiement"
                >
                    <td>
                        Le
                        <strong>{{
                            formatDate(paiement.date_paiement)
                        }}</strong>
                    </td>
                    <td class="text-end">{{ paiement.montant }} $</td>
                    <td>{{ paiement.num_bordereau }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td scope="row" class="fw-bold">Total</td>
                    <td class="fw-bold text-end">{{ totalPayment }} $</td>
                    <td colspan="3"></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script setup lang="ts">
import { formatDate } from "@/functions/string";
import type { Paiement } from "@/models";
import { computed } from "vue";
import { onMounted } from "vue";

const props = defineProps<{
    paiements: Paiement[];
}>();

const totalPayment = computed(() => {
    let totalValue = 0;
    for (const paiement of props.paiements) {
        totalValue += paiement.montant;
    }
    return totalValue.toFixed(2);
});
onMounted(() => {
    console.log(props.paiements);
});
</script>
