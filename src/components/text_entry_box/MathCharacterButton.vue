<script setup lang="ts">
import { inject } from 'vue';



/**
    * This is the PI character
*/
const PI_SYMBOL = inject("PI_SYMBOL") as string;


const props = defineProps<{
    isFocused: boolean,
    mathCharacterButtonWidth: string
}>();

</script>

<template>
    <button
        v-if="isFocused"
        id="mathCharacterButton"
        @click="$emit('addPiCharacter')"
        >{{ PI_SYMBOL }}</button>
</template>

<style scoped>

button {
    width: v-bind("mathCharacterButtonWidth");
}

</style>

