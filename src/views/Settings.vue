<template>
    <section class="container" style="padding-block: 1rem">
        <h1>Paramètres</h1>
        <hr />
        <h2>Modifier l'adresse du serveur</h2>
        <form action="" method="get" @submit.prevent="changeServerAddress()">
            <label for="serverAddress">
                Adresse du serveur
                <input
                    type="text"
                    name="serverAddress"
                    id="serverAddress"
                    placeholder="Par exemple : 127.0.0.1:3000"
                    v-model="serverAddress"
                />
            </label>
            <hr />
            <button type="submit">Modifier les paramètres</button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { useApiStore } from "@/stores/apiStore";
import { ref } from "vue";

const apiStore = useApiStore();
const serverAddress = ref(apiStore.server);
console.log(apiStore.api);

const changeServerAddress = () => {
    if (serverAddress.value) {
        apiStore.setServer(serverAddress.value);
        console.log(apiStore.server, apiStore.api);
    }
};
</script>
