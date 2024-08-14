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
    <div class="absolute top-0 left-0 w-full h-screen justify-center items-center z-20">
        <div class="h-2/3 flex justify-center items-center">
            <div class="w-4/5 lg:w-1/2">
                <div class="text-black bg-white flex flex-col items-center gap-y-10 md:gap-y-20 py-12 rounded-lg">
                    <h1 class="text-center text-5xl z-[inherit]">Game Completed!</h1>
                    <button @click="resetGame" class="text-3xl border border-solid border-black p-2 rounded w-60 hover:bg-gray-300">Play Again?</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

div.absolute {
    background-color: rgba(0, 0, 0, 0.9);
}

</style>

