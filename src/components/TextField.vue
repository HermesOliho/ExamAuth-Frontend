<template>
    <div class="form-group mb-3">
        <label :for="userId" v-if="label" class="form-label">
            {{ label }}
            <span class="text-danger" v-if="required">*</span>
        </label>
        <input
            :type="type ?? 'text'"
            :name="name"
            :id="userId"
            :class="{ 'form-control': true, 'is-invalid': error }"
            v-model="model"
            :required="required"
            :step="step"
            :placeholder="placeholder"
        />
        <div class="invalid-feedback" v-if="error">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps<{
    type?:
        | "text"
        | "email"
        | "tel"
        | "date"
        | "time"
        | "password"
        | "number"
        | "datetime";
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    step?: number;
}>();

const model = defineModel<string | number>({ required: true });
const userId = props.id ?? props.name + "Field";
</script>
