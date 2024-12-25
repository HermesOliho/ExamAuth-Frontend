<template>
    <h1 class="text-center">Espace étudiant</h1>
    <p class="text-center text-secondary">
        Saisissez votre matricule ou votre ID pour afficher votre code QR
    </p>
    <form action="" @submit.prevent="submit" class="mb-4">
        <div class="input-group" role="search">
            <input
                type="text"
                name="matricule"
                id="matricule"
                class="form-control"
                placeholder="Entrez votre matricule ou votre ID"
                v-model="matricule"
            />
            <button type="submit" class="btn btn-primary">Rechercher</button>
        </div>
    </form>
    <section
        v-if="status === 'loaded'"
        class="d-flex justify-content-center p-2"
        style="display: flex; justify-content: center; padding: 0.5rem"
    >
        <QRCodeGenerator :qr-value="qrCodeData" :size="300" />
    </section>
    <div
        v-else-if="status === 'pending' || status === 'exams'"
        class="d-flex justify-content-center align-items-center"
    >
        <div
            class="spinner-border text-primary spinner-border-lg"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="alert alert-warning" v-else-if="status === 'not_found'">
        Aucun résultat !
    </div>
</template>

<script setup lang="ts">
import { apiUrl, studentsEndpoint } from "@/api/infos";
import QRCodeGenerator from "@/components/QRCodeGenerator.vue";
import { formatDate, formatLiteral } from "@/functions/string";
import type { Exam, Etudiant } from "@/models";
import { getStudentByMatricule } from "@/services/studentService";
import { useAuthenticationStore } from "@/stores/authStore";
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const matricule = ref("");
const status: Ref<"no_action" | "pending" | "exams" | "loaded" | "not_found"> =
    ref("no_action");
const student: Ref<Etudiant | null> = ref(null);
const exams: Ref<Exam[] | null> = ref(null);
const route = useRoute();
const authStore = useAuthenticationStore();
const qrCodeData = ref("");

const buildqrData = () => {
    qrCodeData.value = "";
    if (student.value) {
        qrCodeData.value = formatLiteral(student.value);
    }
};

const submit = async () => {
    try {
        status.value = "pending";
        student.value = await getStudentByMatricule(matricule.value);
        if (student.value) {
            buildqrData();
            status.value = "loaded";
        } else {
            status.value = "not_found";
        }
    } catch (error) {
        console.error("Erreur : ", error);
        status.value = "not_found";
    }
};

const visibleExams = computed(() =>
    exams.value?.map(
        (ex) =>
            `${ex.course}, le ${formatDate(new Date(ex.exam_date))} / ${
                ex.room
            }`
    )
);

onMounted(() => {
    console.log(route.params);
    if (authStore.matricule) {
        matricule.value = authStore.matricule;
        submit();
    }
});
</script>
