<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';
import { getExpectedValueOfAngleAtPair } from './unit_circle/unit_circle_calculations';
import { storeToRefs } from 'pinia';


const store = useInputDataStore();
const { userInputValues, correctInputIds } = storeToRefs(store);

/*
const emit = defineEmits<{
    checkValue: [expectedValue: number]
}>();
*/

/**
 * Handles the logic for when the check numbers button is clicked
*/
const whenCheckNumbersIsClicked = () => {
    //const __value__ = getExpectedValueOfAngleAtPair("degrees", {x:-1, y:0} );

    Array.from(userInputValues.value)
        .map((inputValue: String, index: number) => [inputValue, index])
        .filter((valueIndexPair: (String | number)[]) => valueIndexPair[0] !== "")
        .forEach((valueIndexPair: (String | number)[]) => {
            const val = valueIndexPair[0] as String;
            const index = valueIndexPair[1] as number;

            if (val === "123") {
                correctInputIds.value.push(index);
            }
        })
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
