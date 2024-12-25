<template>
    <template v-if="isScanning">
        <h1 class="text-center fw-bold">Scanner le QR</h1>
        <div
            class="mx-auto"
            style="max-width: 450px; margin: 1rem auto; padding: 0.25rem"
        >
            <qrcode-stream @decode="onDecode" @detect="onDetect" />
        </div>
    </template>
    <template v-else>
        <h1 class="text-center fw-bold">Étudiant</h1>
        <template v-if="etudiant">
            <div class="row">
                <div class="col">
                    <StudentInfosTable :student="etudiant" />
                    <div v-if="studentInfos">
                        {{ studentInfos }}
                    </div>
                </div>
                <!-- <div class="col" v-if="exams.length > 0">
                    <h3 class="text-center">Examens</h3>
                    <ul>
                        <li v-for="exam in exams">
                            <strong>{{ exam.course }}</strong
                            >, le <strong>{{ exam.exam_date }}</strong> de
                            <strong>{{ exam.start_time }}</strong> à
                            <strong>{{ exam.end_time }}</strong> ||
                            {{ exam.room }}
                        </li>
                    </ul>
                </div> -->
            </div>
            <PayInfosTable v-if="paiements.length > 0" :paiements="paiements" />
            <div class="alert alert-info" v-else>
                L'étudiant n'a encore rien payé !
            </div>
            <div>
                <!-- <div class="alert alert-info" v-else>Aucun examen prévu !</div> -->
            </div>
        </template>
        <div v-else>
            <div class="alert alert-warning" style="margin-bottom: 1rem">
                Aucun résultat pour
                <strong>{{ matricule.toString() }}</strong> !
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
import type { Etudiant } from "@/models";
import { getDerogationsByEtudiantId } from "@/services/derogationService";
import { getPaiementsByEtudiantId } from "@/services/paiementService";
import { getStudentByMatricule } from "@/services/studentService";
import { ref, watch } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";

const matricule = ref("");
const studentInfos = ref("");
const isScanning = ref(true);
const etudiant = ref<Etudiant | null>(null);
const paiements = ref<
    {
        id: number;
        amount: number;
        payment_date: string;
        reference: string;
        payment_method: string;
    }[]
>([]);
const exams = ref([]);

const onDecode = (content: any) => {
    //
};

// Lorsque un code QR est détecté
const onDetect = (datas: any) => {
    for (const data of datas) {
        studentInfos.value = data.rawValue;
        break;
    }
};

// Refaire le scan
const reScan = () => {
    isScanning.value = true;
    etudiant.value = null;
    matricule.value = "";
};

// Trouver un étudiant
const findStudentByMatricule = async (matricule: string) => {
    try {
        const stdt = await getStudentByMatricule(matricule);
        if (stdt) {
            etudiant.value = stdt;
        }
    } catch (error) {
        console.error("Erreur : ", error);
    }
};

watch(matricule, () => {
    if (matricule.value) {
        isScanning.value = false;
        findStudentByMatricule(matricule.value);
    }
});

watch(etudiant, async () => {
    if (
        etudiant.value?.id_etudiant !== undefined &&
        !isNaN(etudiant.value?.id_etudiant) &&
        etudiant.value.id_etudiant > 0
    ) {
        const studentPayments = await getPaiementsByEtudiantId(
            etudiant.value.id_etudiant ?? 0
        );
        paiements.value = studentPayments;
        const studentExams = await getDerogationsByEtudiantId(
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
