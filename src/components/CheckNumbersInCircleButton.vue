<script setup lang="ts">
import {useInputDataStore} from '@/stores/inputData';
import {
    coordinatesForInputBoxes,
    getExpectedValueOfAngleAtPair,
    type OrderedPair
} from './unit_circle/unit_circle_calculations';
import {storeToRefs} from 'pinia';
import {evaluate} from "mathjs"
import {inject, ref} from "vue";

const PI_SYMBOL = inject("PI_SYMBOL") as string;

const store = useInputDataStore();
const {
    userInputValues,
    correctInputIds,
    currentAngleMode,
    isRadiansEnabled
} = storeToRefs(store);

const shake = ref(false);

/**
 * Handles the logic for when the check numbers button is clicked
 */
const whenCheckNumbersIsClicked = () => {
    let anyIncorrect = false; // track failures

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
                } else {
                    anyIncorrect = true; // mark that at least one attempted input is wrong
                }
            }
        });

    // Trigger shake animation if there was at least one incorrect attempted input
    if (anyIncorrect) {
        shake.value = true;
        setTimeout(() => { shake.value = false; }, 600);
    }
}

</script>

<template>
    <div class="flex justify-center items-center h-48">
        <button
            id="check-numbers-button"
            :class="['border border-solid border-black rounded-md p-4 text-3xl font-light hover:bg-gray-300 lg:w-1/2', { 'shake': shake }]"
            @click="whenCheckNumbersIsClicked"
        >Check Numbers
        </button>
    </div>
</template>

<style scoped>
/* shake animation — small left-right shake used on failure */
.shake {
    animation: shake 600ms cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
}

@keyframes shake {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(2px); }
    30%, 50%, 70% { transform: translateX(-4px); }
    40%, 60% { transform: translateX(4px); }
}
</style>
