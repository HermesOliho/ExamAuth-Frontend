<template>
    <div class="card" style="width: fit-content; padding: 1rem">
        <h3 v-if="generator">Générer un Code QR</h3>
        <input
            type="text"
            v-model="model"
            placeholder="Entrez un texte ou un lien"
            v-if="generator"
        />
        <qrcode-vue :value="qrValue" :size="size ?? 200" />
    </div>
</template>

<script setup lang="ts">
import QrcodeVue from "qrcode.vue";

defineProps<{
    qrValue: string;
    generator?: boolean;
    size?: number;
}>();

const model = defineModel<string>();
</script>

<style scoped>
input {
    margin-bottom: 10px;
    padding: 5px;
    font-size: 16px;
}
</style>
