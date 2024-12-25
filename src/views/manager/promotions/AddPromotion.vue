<template></template>

<script setup lang="ts">
import { apiUrl } from "@/api/infos";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const filiere = ref("");
const route = useRoute();
const id_domaine = ref(0);

const submit = async () => {
    if (filiere.value) {
        const params = new URLSearchParams();
        params.set("nom", filiere.value);
        const result = await axios.post(
            `${apiUrl}/domaine/${id_domaine}/filieres`,
            params
        );
        if (result.status === 200 || result.status === 201) {
            useRouter().push({ name: "liste_domaines" });
        }
    }
};

onMounted(() => {
    id_domaine.value = Number(route.params.id);
});
</script>
