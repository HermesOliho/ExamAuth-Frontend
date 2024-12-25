<script setup lang="ts">
import AdminLogin from "@/components/AdminLogin.vue";
import TextField from "@/components/TextField.vue";
import { login } from "@/services/authService";
import { useAuthenticationStore, type RoleType } from "@/stores/authStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const userCredentials = ref<{
    email: string;
    password: string;
    matricule: string;
}>({
    email: "",
    password: "",
    matricule: "",
});

const loginMode = ref<"normal" | "admin">("normal");
const authErrorMsg = ref<string>("");

const chosenProfile = ref<RoleType>("student");
const router = useRouter();
const authStore = useAuthenticationStore();

const submit = async () => {
    authErrorMsg.value = "Authentification...";
    switch (chosenProfile.value) {
        case "student":
            if (
                authStore.loginAs("student", {
                    matricule: userCredentials.value.matricule,
                })
            ) {
                router.push({ name: "student_space" });
            } else {
                authErrorMsg.value = "Une erreur est survenue";
            }
            break;
        case "user":
            if (
                authStore.loginAs("user", {
                    email: userCredentials.value.email,
                    password: userCredentials.value.password,
                })
            ) {
                router.push({ name: "scanner_qr" });
            } else {
                authErrorMsg.value = "Identifiants incorrects";
            }
            break;
        case "admin":
            if (
                authStore.loginAs("admin", {
                    email: userCredentials.value.email,
                    password: userCredentials.value.password,
                })
            ) {
                router.push({ name: "liste_domaines" });
            } else {
                authErrorMsg.value = "Identifiants incorrects";
            }
            break;
    }
};

const adminLogin = (credentials: { email: string; password: string }) => {
    console.log(credentials, chosenProfile.value);
    userCredentials.value.email = credentials.email;
    userCredentials.value.password = credentials.password;
    submit();
};

onMounted(() => {
    if (authStore.isAuthenticated()) {
        const param = userCredentials.value.matricule;
        router.push(`student/${param}`);
    }
});
</script>

<template>
    <div
        style="
            max-width: 450px;
            margin: 0.5rem auto;
            box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            border-radius: 0.25rem;
        "
        class="shadow rounded p-4"
    >
        <p style="color: darkred; text-align: center">{{ authErrorMsg }}</p>
        <h1 class="text-center mb-4">ExamAuth</h1>
        <div class="d-flex flex-column gap-3">
            <div class="choose-profile">
                <button
                    :style="{
                        backgroundColor:
                            chosenProfile === 'student' ? null : 'transparent',
                        borderColor:
                            chosenProfile === 'student' ? null : 'transparent',
                        color: chosenProfile === 'student' ? null : 'inherit',
                    }"
                    @click="() => (chosenProfile = 'student')"
                >
                    Étudiant
                </button>
                <button
                    :style="{
                        backgroundColor:
                            chosenProfile === 'user' ? null : 'transparent',
                        borderColor:
                            chosenProfile === 'user' ? null : 'transparent',
                        color: chosenProfile === 'user' ? null : 'inherit',
                    }"
                    @click="() => (chosenProfile = 'user')"
                >
                    Gestionnaire
                </button>
            </div>
            <form
                action=""
                @submit.prevent="submit"
                v-if="loginMode == 'normal'"
            >
                <!-- Champs gestionnaire -->
                <template v-if="chosenProfile === 'user'">
                    <p style="text-align: center; color: gray">
                        Ce profil concerne le gestionnaire de campus, le
                        surveillant ou tout autre personne autorisée à scanner
                        une carte d'étudiant
                    </p>
                    <hr style="margin-block: 1rem" />
                    <TextField
                        v-model="userCredentials.email"
                        label="Adresse e-mail"
                        placeholder="Ex : manager@ucbukavu.ac.cd"
                        id="emailField"
                        required
                    />
                    <TextField
                        v-model="userCredentials.password"
                        label="Mot de passe"
                        type="password"
                        id="passwordField"
                        required
                    />
                </template>
                <!-- Champs étudiants -->
                <template v-else>
                    <TextField
                        v-model="userCredentials.matricule"
                        label="Matricule"
                        id="matriculeField"
                        required
                    />
                    <!-- Séparateur -->
                    <!-- <div
                        class="mb-3 position-relative d-flex align-items-center"
                        style="height: 20px"
                    >
                        <hr style="display: block; width: 100%" />
                        <p
                            class="bg-white text-center px-2"
                            style="
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translateX(-50%) translateY(-50%);
                                height: inherit;
                            "
                        >
                            OU
                        </p>
                    </div> -->
                    <!-- Nom post-nom et promotion -->
                    <!-- <div class="row row-cols">
                        <div class="col">
                            <TextField
                                v-model="userCredentials.first_name"
                                label="Nom"
                                id="firstName"
                            />
                        </div>
                        <div class="col">
                            <TextField
                                v-model="userCredentials.last_name"
                                label="Post-nom"
                                id="lastName"
                            />
                        </div>
                    </div>
                    <TextField
                        v-model="userCredentials.promotion"
                        label="Promotion"
                        id="promotion"
                    /> -->
                </template>
                <button type="submit" class="btn btn-primary d-block w-100">
                    S'identifier
                </button>
                <a
                    href="#"
                    @click="
                        () => {
                            loginMode = 'admin';
                            chosenProfile = 'admin';
                        }
                    "
                    style="text-align: center"
                >
                    Connexion en tant qu'administrateur
                </a>
            </form>
            <AdminLogin @login="adminLogin" v-else>
                <a
                    href="#"
                    @click="loginMode = 'normal'"
                    style="text-align: center"
                >
                    Connexion en tant qu'utilisateur
                </a>
            </AdminLogin>
        </div>
    </div>
</template>

<style lang="css" scoped>
.choose-profile {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    background-color: rgba(51, 116, 255, 0.356);
    margin-bottom: 1rem;
    border-radius: 0.25rem;
}
.choose-profile button {
    flex: 1;
    padding-block: 0.35rem;
}
</style>
