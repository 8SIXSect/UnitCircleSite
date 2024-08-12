<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';
import {
    coordinatesForInputBoxes, getExpectedValueOfAngleAtPair, type OrderedPair
} from './unit_circle/unit_circle_calculations';
import { storeToRefs } from 'pinia';
import { evaluate } from "mathjs"
import { inject } from "vue";


const PI_SYMBOL = inject("PI_SYMBOL") as string;


const store = useInputDataStore();
const {
    userInputValues,
    correctInputIds,
    currentAngleMode,
    isRadiansEnabled
} = storeToRefs(store);

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

                // Things are a little backwards in SVG so -y is necessary
                const adjustedPair: OrderedPair = {
                    x: sourcePair.x,
                    y: -sourcePair.y
                }

                const expectedValue: number = getExpectedValueOfAngleAtPair(
                    currentAngleMode.value, adjustedPair
                );

                let inputBoxValueAsNumber: number;

                if (isRadiansEnabled.value) {
                    try {
                        const pattern = new RegExp(PI_SYMBOL, "g");
                        inputBoxValueAsNumber = evaluate(inputBoxValue.replace(pattern, "pi"))
                    } catch {
                        inputBoxValueAsNumber = -1;
                    }
                } else {

                    // If ParseInt fails, it will output NaN; no error is thrown
                    inputBoxValueAsNumber = Number.parseInt(inputBoxValue);
                }

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
