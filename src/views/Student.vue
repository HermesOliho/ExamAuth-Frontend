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
    <section v-if="status === 'loaded' && student" class="student-card-section">
        <div style="display: flex; justify-content: end">
            <button @click="downloadCard()">Télécharger la carte</button>
        </div>
        <StudentCard
            :student="student"
            reference="std-card-ref"
            @mount="handleCardGenerated"
        />
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
import StudentCard from "@/components/StudentCard.vue";
import { formatNumber } from "@/functions/string";
import type { Etudiant, Exam } from "@/models";
import { getStudentByMatricule } from "@/services/studentService";
import { useApiStore } from "@/stores/apiStore";
import { useAuthenticationStore } from "@/stores/authStore";
import download from "downloadjs";
import * as htmlToImage from "html-to-image";
import type { Ref } from "vue";
import { onMounted, ref, useTemplateRef } from "vue";
import { useRoute } from "vue-router";

const matricule = ref("");
const status: Ref<"no_action" | "pending" | "exams" | "loaded" | "not_found"> =
    ref("no_action");
const student: Ref<Etudiant | null> = ref(null);
const route = useRoute();
const authStore = useAuthenticationStore();
const apiStore = useApiStore();
const studentCardRef = ref();

const handleCardGenerated = (value: object) => {
    studentCardRef.value = value;
};

const downloadCard = () => {
    // const element = document.getElementById("studentCard");
    if (studentCardRef.value) {
        htmlToImage
            .toPng(studentCardRef.value)
            .then((dataUrl) => {
                const date = new Date();
                const prefix =
                    `${date.getFullYear()}-${formatNumber(
                        date.getMonth() + 1
                    )}-${date.getDate()}` +
                    `_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
                download(dataUrl, `Carte d'étudiant-${prefix}.png`);
            })
            .catch((error) => {
                console.error("Impossible de télécharger la carte : ", error);
            });
    }
};

const submit = async () => {
    try {
        status.value = "pending";
        student.value = await getStudentByMatricule(
            `${apiStore.api}`,
            matricule.value
        );
        if (student.value) {
            status.value = "loaded";
        } else {
            status.value = "not_found";
        }
    } catch (error) {
        console.error("Erreur : ", error);
        status.value = "not_found";
    }
};

onMounted(() => {
    console.log(route.params);
    if (authStore.matricule) {
        matricule.value = authStore.matricule;
        submit();
    }
});
</script>

<style>
.student-card-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    gap: 2rem;
}
</style>
