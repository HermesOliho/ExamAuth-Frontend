<template>
    <nav class="navbar navbar-expand-xl navbar-light bg-light">
        <div class="container">
            <RouterLink class="navbar-brand" :to="{ name: 'home' }">
                ExamAuth
            </RouterLink>
            <details class="dropdown">
                <summary>Menu</summary>
                <ul>
                    <li>
                        <RouterLink :to="{ name: 'liste_domaines' }">
                            Domaines
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_filieres' }">
                            Filières
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_mentions' }">
                            Mentions
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_promotions' }">
                            Promotions
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_etudiants' }">
                            Etudiants
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_paiements' }">
                            Paiements
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink :to="{ name: 'liste_derogations' }">
                            Dérogations
                        </RouterLink>
                    </li>
                    <li><a href="#">--------</a></li>
                    <li>
                        <RouterLink :to="{ name: 'scanner_qr' }">
                            Scan QR
                        </RouterLink>
                    </li>
                    <li>
                        <span
                            style="color: darkred; cursor: pointer"
                            @click="logout"
                        >
                            Déconnexion
                        </span>
                    </li>
                </ul>
            </details>
        </div>
    </nav>
    <div class="container" style="padding-block: 1rem">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthenticationStore();
const router = useRouter();

const logout = async () => {
    await authStore.logout();
    router.push({ name: "home" });
};
</script>

<style lang="css" scoped>
.navbar {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
    height: 3.5rem;
}
.navbar .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.navbar .collapse {
    display: flex;
    align-items: center;
    gap: 1rem;
}
@media (min-width: 1000px) {
    .navbar-toggler {
        display: none;
    }
}
</style>
