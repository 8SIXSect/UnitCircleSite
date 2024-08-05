<template>
    <input class="rounded" v-model="inputForRadiansModel" @input="sanitizeInput" />
</template>

<script setup lang="ts">

import { type Ref, defineProps, watch } from 'vue';

const props = defineProps<{
    inputForRadiansModel: Ref<string, string>
}>();

const { inputForRadiansModel } = props;


/**
    * Prevents the user from inputting invalid characters
*/
const sanitizeInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        const inputValue: string = event.target.value;
        const filteredValue: string = inputValue.replace(/[^0-9/piπ]/g, "");
        inputForRadiansModel.value = filteredValue;
    }
};

// Purpose: watch for input change and replace "pi" with pi symbol
watch(inputForRadiansModel, (currentValue: string) => {
    const patternForReplacement: RegExp = /pi/gi;
    inputForRadiansModel.value = currentValue.replace(patternForReplacement, "π");
});


</script>

<style scoped>

input {
    position: absolute;
    transform: translate(550%, -60%);
    z-index: 10;

    outline: none;
    border: 1px solid black;
    width: 6ch;
    padding: 0;
    text-align: center;
}

</style>

