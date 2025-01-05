<template>
    <form action="" @submit.prevent="submit">
        <h4 style="text-align: center">Gestionnaire du site</h4>
        <label for="email">
            <span>Adresse e-mail</span>
            <input
                type="email"
                name="email"
                id="email"
                v-model="credentials.email"
            />
        </label>
        <label for="password">
            <span>Mot de passe</span>
            <input
                type="password"
                name="password"
                id="password"
                v-model="credentials.password"
            />
        </label>
        <button type="submit">Connexion</button>
        <hr />
        <slot></slot>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const credentials = ref<{
    email: string;
    password: string;
}>({
    email: "",
    password: "",
});

const emit = defineEmits<{
    login: [value: { email: string; password: string }];
}>();

const submit = () => {
    emit("login", credentials.value);
};
</script>
