<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';


const store = useInputDataStore();


/**
    * Purpose: this function will reset the store to its initial values
*/
const resetGame = () => {
    store.$reset();
}

</script>

<template>
    <div class="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center z-20">
        <h1 class="text-center text-5xl z-[inherit]">Game Completed!</h1>
        <button @click="resetGame" class="text-3xl border border-solid border-black p-2 rounded">Retry?</button>
    </div>
</template>


<style scoped>
div.absolute {
    background: rgba(0, 0, 0, 0.65);
}

</style>
