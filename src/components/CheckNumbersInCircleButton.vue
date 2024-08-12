<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';
import { coordinatesForInputBoxes, getExpectedValueOfAngleAtPair } from './unit_circle/unit_circle_calculations';
import { storeToRefs } from 'pinia';
import type { OrderedPair } from '@/shared_types';


const store = useInputDataStore();
const { userInputValues, correctInputIds } = storeToRefs(store);

/**
 * Handles the logic for when the check numbers button is clicked
*/
const whenCheckNumbersIsClicked = () => {
    Array.from(userInputValues.value)
        .map((inputValue: string, index: number) => [inputValue, index])
        .filter((valueIndexPair: (string | number)[]) => valueIndexPair[0] !== "")
        .forEach((valueIndexPair: (string | number)[]) => {
            
            const inputBoxValue = valueIndexPair[0] as string;
            const inputId = valueIndexPair[1] as number;


            if (!correctInputIds.value.includes(inputId)) {

                const sourcePair: OrderedPair = coordinatesForInputBoxes[inputId]
                const adjustedPair: OrderedPair = {
                    x: sourcePair.x,
                    y: -sourcePair.y
                }

                const expectedValue: number = getExpectedValueOfAngleAtPair("degrees", adjustedPair);
                
                // here's where you would check deg/rad mode
                const inputBoxValueAsNumber: number = Number.parseInt(inputBoxValue)

                if (expectedValue === inputBoxValueAsNumber) {
                    correctInputIds.value.push(inputId);
                }
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
