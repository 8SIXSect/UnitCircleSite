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
    <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <h1 class="bg-white text-center">Game Completed!</h1>
        <button @click="resetGame">Retry?</button>
    </div>
</template>


<style scoped>
div {
    background: rgba(0, 0, 0, 0.5);
}
</style>
