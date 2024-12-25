<template>
    <!-- Informations de l'étudiant -->
    <section v-if="student">
        <h1>Étudiant</h1>
        <div class="row">
            <div class="col-12 col-md-6">
                <student-infos-table :student="student" />
            </div>
            <div class="col-12 col-md-6">
                <div v-if="visibleExams.length > 0">
                    <h3>Examens</h3>
                    <ul>
                        <li v-for="exam in visibleExams">{{ exam }}</li>
                    </ul>
                </div>
                <div class="alert alert-info" v-else>Aucun examen prévu !</div>
            </div>
        </div>
    </section>
    <!-- Actions sur le compte courant -->
    <section
        v-if="student"
        class="d-flex justify-content-around align-items-center my-3"
    >
        <RouterLink to="#" class="btn btn-primary">
            Enregistrer un paiement
        </RouterLink>
        <RouterLink :to="{ name: 'student_to_exam' }" class="btn btn-secondary">
            Affecter un examen
        </RouterLink>
    </section>
    <!-- Loader en cas de chargement -->
    <div class="d-flex justify-content-center align-items-center" v-else>
        <div
            class="spinner-border text-primary spinner-border-lg"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script setup>
import { apiUrl, studentsEndpoint } from "@/api/infos";
import { formatDate } from "@/functions/string";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import StudentInfosTable from "@/components/StudentInfosTable.vue";
import { getStudentById } from "@/services/studentService";

const student = ref(null);
const exams = ref([]);
const apiEndPoint = `${apiUrl}/${studentsEndpoint}`;
const route = useRoute();

onMounted(async () => {
    student.value = await getStudentById(route.params.id);
});

watch(student, () => {
    if (!isNaN(parseInt(student.value.id))) {
        fetch(`${apiEndPoint}/${student.value.id}/exams`)
            .then((r) => {
                if (r.ok) {
                    return r.json();
                }
            })
            .then((data) => {
                if (data.message) console.log(data.message);
                else exams.value = data;
            })
            .catch(console.error);
    }
});

const visibleExams = computed(() =>
    exams.value?.map(
        (ex) =>
            `${ex.course}, le ${formatDate(new Date(ex.exam_date))} | Salle : ${
                ex.room
            }`
    )
);
</script>
