<template>
    <template v-if="isScanning">
        <h1 class="text-center fw-bold">Scanner le QR</h1>
        <div
            class="mx-auto"
            style="max-width: 450px; margin: 1rem auto; padding: 0.25rem"
        >
            <qrcode-stream @detect="onDetect" />
        </div>
    </template>
    <template v-else>
        <h1 class="text-center fw-bold">Résultat</h1>
        <template v-if="studentInfos">
            <div class="row">
                <div class="col" style="padding: 1rem">
                    <StudentInfosTable :student="etudiant" v-if="etudiant" />
                </div>
            </div>
        </template>
        <div v-else>
            <div class="alert alert-warning" style="margin-bottom: 1rem">
                Aucun résultat pour
                <strong>{{ studentInfos.matricule.toString() }}</strong> !
            </div>
        </div>
        <button class="d-block btn btn-primary btn-lg mx-auto" @click="reScan">
            Refaire le scan
        </button>
    </template>
</template>

<script setup lang="ts">
import PayInfosTable from "@/components/PayInfosTable.vue";
import StudentInfosTable from "@/components/StudentInfosTable.vue";
import type { Etudiant, Paiement } from "@/models";
import { getDerogationsByEtudiantId } from "@/services/derogationService";
import { getPaiementsByEtudiantId } from "@/services/paiementService";
import { getStudentByMatricule } from "@/services/studentService";
import { useApiStore } from "@/stores/apiStore";
import { ref, watch } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

const studentInfos = ref<Partial<Etudiant> | null>(null);
const isScanning = ref(true);
const etudiant = ref<Etudiant | null>(null);
const paiements = ref<Paiement[]>([]);
const exams = ref([]);
const apiStore = useApiStore();

// Lorsque un code QR est détecté
const onDetect = (datas: any) => {
    for (const data of datas) {
        studentInfos.value = JSON.parse(data.rawValue);
        isScanning.value = false;
        console.log("scanned", studentInfos.value);
        break;
    }
};

// Refaire le scan
const reScan = () => {
    isScanning.value = true;
    etudiant.value = null;
    studentInfos.value = null;
};

// Trouver un étudiant
const findStudentByMatricule = async (matricule: string) => {
    try {
        const stdt = await getStudentByMatricule(`${apiStore.api}`, matricule);
        if (stdt) {
            etudiant.value = stdt;
        }
    } catch (error) {
        console.error("Erreur : ", error);
    }
};

watch(studentInfos, () => {
    if (studentInfos.value) {
        isScanning.value = false;
        findStudentByMatricule(studentInfos.value.matricule as string);
    }
});

watch(etudiant, async () => {
    if (
        etudiant.value?.id_etudiant !== undefined &&
        !isNaN(etudiant.value?.id_etudiant) &&
        etudiant.value.id_etudiant > 0
    ) {
        const studentPayments = await getPaiementsByEtudiantId(
            `${apiStore.api}/paiements`,
            etudiant.value.id_etudiant ?? 0
        );
        paiements.value = studentPayments;
        const studentExams = await getDerogationsByEtudiantId(
            `${apiStore.api}/derogations`,
            etudiant.value.id_etudiant ?? 0
        );
        exams.value = studentExams;
    }
});

// onMounted(() => {
//     console.log("Mounted !");
//     navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//             console.log(stream);
//             console.log("Caméra OK!");
//             alert("Caméra OK!");
//         })
//         .catch((error) => console.log("Problème de caméra"));
// });
</script>
