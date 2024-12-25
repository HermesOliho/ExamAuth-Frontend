<template>
    <RouterView />
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const authStore = useAuthenticationStore();

onMounted(() => {
    if (
        !authStore.isAuthenticated("user") &&
        !authStore.isAuthenticated("admin")
    ) {
        authStore.logout();
        useRouter().push("/");
    }
});
</script>
