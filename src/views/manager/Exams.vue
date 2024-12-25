<template>
    <header class="hwith-actions">
        <h1>Examens programmés</h1>
        <RouterLink
            :to="{ name: 'new_exam' }"
            style="padding-block: 0.25rem"
            role="button"
        >
            Ajouter un examen
        </RouterLink>
    </header>
    <hr />
    <section v-if="data">
        <form class="input-group mb-3" role="search">
            <input
                type="search"
                class="form-control"
                placeholder="Trouver rapidement un étudiant"
                v-model="searchedExam"
            />
            <button type="button" class="btn btn-primary">Trouver</button>
        </form>
        <div class="table-responsive" v-if="visibleExams.length > 0">
            <table class="striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Cours</th>
                        <th scope="col">Salle</th>
                        <th scope="col">Date</th>
                        <th scope="col">Durée</th>
                        <th scope="col" class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="" v-for="exam in visibleExams">
                        <td scope="row">{{ exam.id }}</td>
                        <td>
                            {{ exam.course }}
                        </td>
                        <td>
                            {{ exam.room }}
                        </td>
                        <td>
                            Le
                            {{
                                formatDate(
                                    undefined,
                                    exam.exam_date?.toString()
                                )
                            }}
                        </td>
                        <td>
                            De
                            {{ exam.start_time }}
                            à
                            {{ exam.end_time }}
                        </td>
                        <td>
                            <div class="table-actions">
                                <RouterLink
                                    :to="{
                                        name: 'student_infos',
                                        params: { id: exam.id },
                                    }"
                                    role="button"
                                >
                                    Infos
                                </RouterLink>
                                <button
                                    class="secondary"
                                    v-if="exam.id && false"
                                >
                                    Modifier
                                </button>
                                <a
                                    href="#"
                                    v-if="exam.id"
                                    class=""
                                    @click="deleteStudent(exam.id)"
                                >
                                    Supprimer
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="alert alert-primary">Aucun résultat !</div>
    </section>
</template>

<script setup lang="ts">
import { apiUrl, examsEndpoint, studentsEndpoint } from "@/api/infos";
import { formatDate, formatTime } from "@/functions/string";
import { useFetch } from "@/hooks/useFetch";
import type { Exam, Etudiant } from "@/models";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const apiEndPoint = `${apiUrl}/${examsEndpoint}`;
const router = useRouter();

const { data, success, error } = useFetch<Partial<Exam>[]>(`${apiEndPoint}`);
const searchedExam = ref("");

watch(data, () => {
    console.log(data.value);
});

const visibleExams = computed(() => {
    if (!data.value) {
        return [];
    }
    if (searchedExam.value) {
        const s = searchedExam.value.toLowerCase();
        return data.value.filter((ex) => {
            if (ex.course && ex.room) {
                const cs = ex.course.toLowerCase();
                const rm = ex.room.toLowerCase();
                return cs.indexOf(s) > -1 || rm.indexOf(s) > -1;
            }
            return false;
        });
    }
    return data.value;
});

const deleteStudent = (id: number) => {
    const { success } = useFetch(`${apiEndPoint}/${id}`, "DELETE");
    watch(success, () => console.log(success.value));
};
</script>
