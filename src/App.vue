<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
const route = useRoute();

const rootRoutes = ["home", "student_space", "login", "scanner_qr"];

onMounted(() => {
    console.log(import.meta);
});
</script>

<template>
    <NavBar />

    <div
        class="container"
        style="padding-top: 1rem; padding-bottom: 0.5rem"
        v-if="rootRoutes.includes(route.name as string)"
    >
        <RouterView />
    </div>
    <RouterView v-else />
</template>
