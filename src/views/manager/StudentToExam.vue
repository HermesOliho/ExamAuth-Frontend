<template>
    <h1>Assigner un examen à un étudiant</h1>
    <form action="" @submit.prevent="submit">
        <SelectField
            :options="studentsData"
            label="Étudiant"
            v-model="form.id_student"
        />
        <SelectField
            :options="examsData"
            label="Examen"
            v-model="form.id_exam"
        />
        <button type="submit" class="btn btn-primary">Valider</button>
    </form>
</template>

<script setup lang="ts">
import { apiUrl } from "@/api/infos";
import SelectField from "@/components/SelectField.vue";
import { useFetch } from "@/hooks/useFetch";
import type { Exam, Etudiant } from "@/models";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const form = ref({ id_student: 0, id_exam: 0 });
const router = useRouter();

const { data } = useFetch<{ students: Etudiant[]; exams: Exam[] }>(
    `${apiUrl}/have-exam/get-data`
);

watch(data, () => console.log(data));

const studentsData = computed(() =>
    data.value?.students.map((st) => ({
        value: st.id,
        text: st.first_name + " " + st.last_name,
    }))
);

const examsData = computed(() =>
    data.value?.exams.map((st) => ({
        value: st.id,
        text: st.course + " / " + st.exam_date,
    }))
);

const submit = () => {
    const { data, success } = useFetch(
        `${apiUrl}/have-exam`,
        "POST",
        JSON.stringify(form.value)
    );
    watch(success, () => {
        router.push({ name: "all_students" });
    });
};
</script>
