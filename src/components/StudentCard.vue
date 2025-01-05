<template>
    <div class="student-card" id="studentCard" ref="card-ref">
        <div class="infos" style="">
            <div class="institution">
                <h4>Université Catholique de Bukavu</h4>
            </div>
            <h3>Carte d'étudiant</h3>
            <ul>
                <li>
                    Nom : <strong>{{ student.nom }}</strong>
                </li>
                <li>
                    Post-nom : <strong>{{ student.post_nom }}</strong>
                </li>
                <li>
                    Sexe : <strong>{{ student.sexe }}</strong>
                </li>
                <li>
                    Adresse : <strong>{{ student.adresse }}</strong>
                </li>
            </ul>
            <p style="text-align: center; font-weight: bold">
                Année Académique {{ student.annee_academique }}
            </p>
        </div>
        <div class="images">
            <div class="profile" v-if="false">
                <img
                    :src="apiStore.server + student.image_url"
                    alt="Photo de l'étudiant"
                />
            </div>
            <QRCodeGenerator :qr-value="qrCodeData" :size="200" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Etudiant } from "@/models";
import { useApiStore } from "@/stores/apiStore";
import { onMounted, ref, useTemplateRef, type Ref } from "vue";
import QRCodeGenerator from "./QRCodeGenerator.vue";

const props = defineProps<{
    student: Etudiant;
    reference: string;
}>();
const emit = defineEmits(["mount"]);

const apiStore = useApiStore();
const qrCodeData = ref("");
const cardRef = useTemplateRef("card-ref");

const buildqrData = () => {
    qrCodeData.value = "";
    if (props.student) {
        // qrCodeData.value = formatLiteral(student.value);
        qrCodeData.value = JSON.stringify({
            matricule: props.student.matricule,
            nom: props.student.nom,
            post_nom: props.student.post_nom,
            sexe: props.student.sexe,
            promotion: props.student.promotion,
            dernire_annee: props.student.annee_academique,
        });
    }
};

onMounted(() => {
    buildqrData();
    const T = setTimeout(() => {
        emit("mount", cardRef.value);
    }, 300);
    console.log(props.student);
});
</script>

<style lang="css" scoped>
.student-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    color: black;
    background-color: #fff;
    width: calc(200px + 500px);
    border: 1px double silver;
    position: relative;
    padding: 1rem;
    padding-left: 2rem;
    .infos {
        opacity: 100%;
        & *:not(.institution) {
            color: black !important;
        }
        .institution {
            * {
                color: darkblue !important;
            }
            h4 {
                font-weight: 300;
                text-decoration: underline;
                text-underline-offset: 4px;
            }
        }
        h3 {
            text-transform: uppercase;
        }
    }
    .images {
        display: flex;
        flex-direction: column;
        align-items: end;
        justify-content: center;
        gap: 0.25rem;
        .profile {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(240, 240, 240);
            width: 100%;
            padding: 0.75rem 1rem;
            background-clip: content-box;
        }
        img {
            width: 120px;
            aspect-ratio: 1/1;
            object-fit: cover;
            object-position: center;
        }
    }
}
</style>
