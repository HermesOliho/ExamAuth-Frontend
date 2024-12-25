<template>
    <h1>Nouvel examen</h1>
    <form action="#" @submit.prevent="submit">
        <TextField v-model="form.course" label="Cours" />
        <TextField
            v-model="form.exam_date"
            label="Date de l'examen"
            type="date"
        />
        <TextField v-model="form.room" label="Salle de l'examen" />
        <TextField
            v-model="form.start_time"
            label="Heure de début"
            type="time"
        />
        <TextField v-model="form.end_time" label="Heure de fin" type="time" />
        <button type="submit" class="btn btn-primary">Enregistrer</button>
    </form>
</template>

<script setup lang="ts">
import { apiUrl, examsEndpoint } from "@/api/infos";
import TextField from "@/components/TextField.vue";
import { useFetch } from "@/hooks/useFetch";
import { watch } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const form = ref({
    course: "",
    exam_date: "",
    room: "",
    start_time: "",
    end_time: "5",
});

const router = useRouter();

const submit = () => {
    const { data, success, error } = useFetch<{
        success: boolean;
        message: string;
    }>(`${apiUrl}/${examsEndpoint}`, "POST", JSON.stringify(form.value));
    watch(data, () => {
        if (success.value) {
            if (data.value?.success) {
                router.push({ name: "exams" });
            }
            console.log(data.value?.message);
        } else {
            console.error("Une erreur s'est produite ", error.value);
        }
    });
};
</script>
