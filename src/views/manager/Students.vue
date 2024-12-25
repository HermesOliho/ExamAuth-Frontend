<template>
    <header class="d-flex justify-content-between align-items-center mb-3">
        <h1>Étudiants inscrits</h1>
        <RouterLink :to="{ name: 'new_student' }" class="btn btn-primary"
            >Ajouter un étudiant</RouterLink
        >
    </header>
    <hr />
    <section v-if="students">
        <div class="input-group mb-3" role="search">
            <input
                type="search"
                class="form-control"
                placeholder="Trouver rapidement un étudiant"
                v-model="searchedStudent"
            />
            <button type="button" class="btn btn-primary">Trouver</button>
        </div>
        <div class="overflow-auto" v-if="visibleStudents.length > 0">
            <table class="table table-striped border">
                <thead>
                    <tr>
                        <th scope="col">Matricule</th>
                        <th scope="col">Prénom et nom</th>
                        <th scope="col">Promotion et année</th>
                        <th scope="col" class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        class=""
                        v-for="student in visibleStudents"
                        :key="student.matricule"
                    >
                        <td scope="row">{{ student.matricule }}</td>
                        <td scope="row">
                            <img
                                :src="student.image_url"
                                :alt="`Photo de ${student.nom}`"
                                width="60px"
                                height="60px"
                                style=""
                            />
                            <!-- {{ student.image_url }} -->
                        </td>
                        <td>
                            {{ student.nom + " " + student.post_nom }}
                        </td>
                        <td>
                            {{ student.promotion }} /
                            {{ student.annee_academique }}
                        </td>
                        <td>
                            <div class="table-actions">
                                <RouterLink
                                    :to="{
                                        name: 'student_infos',
                                        params: { id: student.id_etudiant },
                                    }"
                                    role="button"
                                    class="btn btn-primary"
                                >
                                    Infos
                                </RouterLink>
                                <button
                                    class="contrast"
                                    v-if="student.id_etudiant"
                                >
                                    Modifier
                                </button>
                                <button
                                    v-if="student.id_etudiant"
                                    class="secondary"
                                    @click="deleteStudent(student.id_etudiant)"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="alert alert-primary">Aucun résultat !</div>
    </section>
    <div class="alert alert-info" v-else>Aucun étudiant inscrit !</div>
</template>

<script setup lang="ts">
import { apiUrl, studentsEndpoint } from "@/api/infos";
import { useFetch } from "@/hooks/useFetch";
import type { Etudiant } from "@/models";
import { deleteStudentById, getStudents } from "@/services/studentService";
import axios from "axios";
import { computed, onMounted, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";

const apiEndPoint = `${apiUrl}/${studentsEndpoint}`;
const router = useRouter();

const students: Ref<Etudiant[] | null> = ref(null);
const searchedStudent = ref("");

const loadStudents = async () => {
    students.value = await getStudents();
    // console.log(await getStudents());
};

onMounted(() => {
    loadStudents();
});

const visibleStudents = computed(() => {
    if (!students.value) {
        return [];
    }
    if (searchedStudent.value) {
        const s = searchedStudent.value.toLowerCase();
        return students.value.filter((st) => {
            if (st.nom && st.post_nom) {
                const fn = st.nom.toLowerCase();
                const ln = st.post_nom.toLowerCase();
                return fn.indexOf(s) > -1 || ln.indexOf(s) > -1;
            }
            return false;
        });
    }
    return students.value;
});

const deleteStudent = (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
        deleteStudentById(id).then((data) => {
            console.log(data);
        });
    }
};
</script>
