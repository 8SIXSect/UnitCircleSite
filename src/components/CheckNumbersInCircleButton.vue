<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';
import { getExpectedValueOfAngleAtPair } from './unit_circle/unit_circle_calculations';
import { storeToRefs } from 'pinia';


const store = useInputDataStore();
const { userInputValues } = storeToRefs(store);

/*
const emit = defineEmits<{
    checkValue: [expectedValue: number]
}>();
*/

/**
 * Handles the logic for when the check numbers button is clicked
*/
const whenCheckNumbersIsClicked = () => {
    const value = getExpectedValueOfAngleAtPair("degrees", {x:-1, y:0} );
    console.log(value, userInputValues.value);
    //emit("checkValue", )
}

</script>


<template>
    <div class="flex justify-center items-center">
        <button
            class="border border-solid border-black"
            @click="whenCheckNumbersIsClicked"
            >Check Numbers</button>
    </div>
</template>
