<template>
    <h1>Inscrire un nouvel étudiant</h1>
    <form action="#" method="post" @submit.prevent="submit">
        <TextField v-model="form.matricule" label="Matricule" required />
        <TextField v-model="form.first_name" label="Prénom" required />
        <TextField
            v-model="form.last_name"
            label="Nom (et post-nom)"
            required
        />
        <TextField
            v-model="form.email"
            label="Adresse e-mail"
            type="email"
            required
        />
        <TextField
            v-model="form.phone"
            label="Numéro de téléphone"
            type="tel"
            required
        />
        <TextField
            v-model="form.date_of_birth"
            label="Date de naissance"
            type="date"
            required
        />
        <TextField v-model="form.address" label="Adresse" required />
        <TextField
            v-model="form.academic_year"
            label="Année académique"
            required
        />
        <TextField v-model="form.program" label="Promotion" required />
        <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
</template>

<script setup lang="ts">
import { apiUrl, studentsEndpoint } from "@/api/infos";
import TextField from "@/components/TextField.vue";
import { ucwords } from "@/functions/string";
import { useFetch } from "@/hooks/useFetch";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const form = ref({
    matricule: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    academic_year: "2024-2025",
    program: "",
});

const router = useRouter();

const submit = () => {
    const { data, success, error } = useFetch<{
        success: boolean;
        message: string;
    }>(`${apiUrl}/${studentsEndpoint}`, "POST", JSON.stringify(form.value));
    watch(data, () => {
        if (success.value) {
            if (data.value?.success) {
                router.push({ name: "all_students" });
            }
            console.log(data.value?.message);
        } else {
            console.error("Une erreur s'est produite ", error.value);
        }
    });
};
</script>
