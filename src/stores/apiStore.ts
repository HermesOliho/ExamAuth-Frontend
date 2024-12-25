import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiStore = defineStore(
    "api_store",
    () => {
        const serverUrl = ref("https://172.20.10.10:3000");
        const apiUrl = ref(`${serverUrl}/api`);
        const setServer = (newUrl: string) => {
            serverUrl.value = newUrl;
        };
        return {
            server: serverUrl,
            api: apiUrl,
            setServer,
            changeServerAddress: (address: string, port: number = 3000) => {
                setServer(`https://${address}:${port}`);
            },
        };
    },
    { persist: true }
);
