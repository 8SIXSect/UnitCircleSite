<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';


const store = useInputDataStore();

const props = defineProps<{
    isButtonEnabled: boolean,
    textToDisplay: string
}>();

</script>

<template>
    <button v-if="isButtonEnabled" class="border-b border-neutral-900 flex-1 h-10 bg-neutral-200" disabled>{{ textToDisplay }}</button>
    <button v-else @click="store.switchAngleMode" class="flex-1 h-10 border-b">{{ textToDisplay }}</button>
</template>
