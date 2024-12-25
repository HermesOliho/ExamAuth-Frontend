import { ref } from "vue";

export function useFetch<T>(
    url: string,
    method: string = "GET",
    body: any = null
) {
    const data = ref<T | null>(null);
    const success = ref(false);
    const error = ref<string | null>(null);
    const isLoading = ref(false);

    const fetchData = async () => {
        isLoading.value = true;
        success.value = false;
        error.value = null;

        try {
            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (body) {
                options.body =
                    typeof body === "string" ? body : JSON.stringify(body);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data.value = await response.json();
            success.value = true;
        } catch (err: any) {
            error.value = err.message || "Une erreur inconnue s'est produite.";
        } finally {
            isLoading.value = false;
        }
    };

    fetchData();

    return { data, success, error, isLoading };
}
