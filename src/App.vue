<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import { canUseApp } from "./functions/versions";
import { ref } from "vue";

const route = useRoute();
const isAuthorized = ref(false);

const rootRoutes = ["home", "student_space", "login", "scanner_qr"];

onMounted(() => {
    isAuthorized.value = canUseApp();
});
</script>

<template>
    <NavBar />

    <div
        class="container"
        style="padding-top: 1rem; padding-bottom: 0.5rem"
        v-if="rootRoutes.includes(route.name as string)"
    >
        <RouterView v-if="isAuthorized" />
        <div v-else>
            <h1>Periode d'essai écoulée</h1>
            <p>
                La période d'essai de l'application est écoulée.<br />
                Veuillez régler le paiement pour continuer à l'utiliser :)
            </p>
        </div>
    </div>
    <RouterView v-else />
</template>
