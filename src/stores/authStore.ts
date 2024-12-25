import { defineStore } from "pinia";
import { ref } from "vue";

export type RoleType = "student" | "user" | "admin" | null;

export const useAuthenticationStore = defineStore(
    "auth",
    () => {
        const token = ref<string | null>(null);
        const userName = ref<string | null>(null);
        const matricule = ref<string | null>(null);
        const id = ref<string | number | null>(null);
        const authRole = ref<RoleType>("student");

        const logout = async () => {
            // if (await logoutFromBackend()) {
            //     token.value = null;
            //     userName.value = null;
            //     id.value = null;
            //     useRouter().push({ name: "home" });
            // }
            token.value = null;
            userName.value = null;
            id.value = null;
            authRole.value = null;
        };

        return {
            token,
            userName,
            id,
            matricule,
            role: authRole,
            setToken: (value: string | null) => {
                token.value = value;
            },
            setUserName: (value: string | null) => {
                userName.value = value;
            },
            setId: (value: string | number | null) => {
                id.value = value;
            },
            loginAs: (
                value: RoleType,
                data: { matricule?: string; email?: string; password?: string }
            ) => {
                switch (value) {
                    case "student":
                        if (data.matricule) {
                            authRole.value = value;
                            matricule.value = data.matricule;
                            return true;
                        }
                        return false;
                        break;
                    case "user":
                        if (
                            data.email === "cubaka.nyamashali@ucbukavu.ac.cd" &&
                            data.password === "robert243@"
                        ) {
                            authRole.value = "user";
                            return true;
                        }
                        return false;
                    case "admin":
                        if (
                            data.email ===
                                "lukogo.mushagalusa@ucbukavu.ac.cd" &&
                            data.password === "test-admin"
                        ) {
                            authRole.value = "user";
                            return true;
                        }
                        return false;
                }
            },
            isAuthenticated: (role: RoleType = "user") =>
                authRole.value === role,
            logout,
        };
    },
    { persist: true }
);
