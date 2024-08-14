<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';


const store = useInputDataStore();

const props = defineProps<{
    isButtonEnabled: boolean,
    textToDisplay: string
}>();

</script>

<template>
    <button v-if="isButtonEnabled" class="border-b border-neutral-900 flex-1 h-16 bg-neutral-200 text-3xl lg:text-2xl" disabled>{{ textToDisplay }}</button>
    <button v-else @click="store.switchAngleMode" class="border-b flex-1 h-16 text-3xl lg:text-2xl">{{ textToDisplay }}</button>
</template>
