<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authStore";
import { RouterLink, useRoute, useRouter } from "vue-router";
const route = useRoute();

const rootRoutes = ["home", "student_space", "login", "scanner_qr", "settings"];
const router = useRouter();

const authStore = useAuthenticationStore();

const logout = () => {
    authStore.logout();
    router.push({ name: "home" });
};
</script>

<template>
    <nav
        class="navbar navbar-expand-md navbar-light bg-light"
        style="height: 4rem"
        v-if="rootRoutes.includes(route.name as string)"
    >
        <div class="container">
            <RouterLink
                class="navbar-brand"
                :to="{ name: 'home' }"
                style="font-size: 1.2rem; font-weight: bold"
            >
                ExamAuth
            </RouterLink>
            <details class="dropdown">
                <summary>Menu</summary>
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'home' }">
                            Accuiel
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            :to="{ name: 'student_space' }"
                        >
                            Espace étudiant
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            :to="{ name: 'home' }"
                            @click="logout()"
                        >
                            Espace gestionnaire
                        </RouterLink>
                    </li>
                    <li>
                        <a href="#" style="color: darkred" @click="logout()">
                            Se déconnecter
                        </a>
                    </li>
                    <li><hr /></li>
                    <li>
                        <RouterLink to="/settings"> Paramètres </RouterLink>
                    </li>
                </ul>
            </details>
        </div>
    </nav>
</template>

<style lang="css" scoped>
.navbar {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
}
.navbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
@media (min-width: 1000px) {
    .navbar-toggler {
        display: none;
    }
}
</style>
