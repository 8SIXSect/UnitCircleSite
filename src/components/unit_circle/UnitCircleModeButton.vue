<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';


const store = useInputDataStore();

const props = defineProps<{
    isButtonEnabled: boolean,
    textToDisplay: string
}>();

</script>

<template>
    <button v-if="isButtonEnabled" class="border-b" disabled>{{ textToDisplay }}</button>
    <button v-else @click="store.switchAngleMode">{{ textToDisplay }}</button>
</template>
