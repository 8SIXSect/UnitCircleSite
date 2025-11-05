<script setup lang="ts">

import type {OrderedPair} from '@/components/unit_circle/unit_circle_calculations';
import MathCharacterButton from '@/components/inputbox/subcomponents/MathCharacterButton.vue';
import InnerInputBox from '@/components/inputbox/subcomponents/InnerInputBox.vue';
import {useInputDataStore} from '@/stores/inputData';
import {storeToRefs} from 'pinia';
import {inject} from 'vue';
import styles from "@/styles/widths.module.scss";

const PI_SYMBOL = inject("PI_SYMBOL") as string;

const store = useInputDataStore();
const {userInputValues, isRadiansEnabled, maxLengthForInputBox} = storeToRefs(store);

const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    isCorrect: boolean,
    inputId: number
}>();

const {coordinatesForInput, inputId} = props;

/**
 * Translate will position the input in desired location on the Unit Circle
 */
const getCoordinatesWithMultiplierForY = (diameter: string, multiplier: number): string => {
    const unitCircleRadius: number = parseFloat(diameter) / 2;
    const translateX = unitCircleRadius * coordinatesForInput.x;
    const translateY = unitCircleRadius * coordinatesForInput.y * multiplier;

    return `translate(${translateX}vw, ${translateY}vw)`
}

/**
 * At base width breakpoint, the input boxes with x=1/2 are translated up a tiny bit
 */
const baseTranslate: string = getCoordinatesWithMultiplierForY(
    styles.base,
    Math.abs(coordinatesForInput.x) === (1 / 2) ? 1.03 : 1.0
);

// These are used in conjunction with CSS media queries (v-bind)
const mediumTranslate: string = getCoordinatesWithMultiplierForY(styles.base, 1.0);
const largeTranslate: string = getCoordinatesWithMultiplierForY(styles.large, 1.0);

/**
 * The math character button is only going to be the PI symbol which is a single
 * character. But, a second "ch" is added for space
 */
const mathCharButtonWidth = "2ch";

/**
 * This is used to determine if a Math Char Button should be placed.
 * A button will not be placed on the far right of x-axis
 */
const isXAxisInput = inputId === 0;

/**
 * Purpose is to write a pi symbol in the inputBox when this button is clicked
 */
const addPiSymbolToInput = () => {
    if (userInputValues.value[inputId].length < maxLengthForInputBox.value) {
        userInputValues.value[inputId] += PI_SYMBOL;
    }
}

</script>

<template>
    <div class="flex absolute z-10" id="inputBoxContainer">
        <InnerInputBox
            :is-focused="isFocused"
            :is-correct="isCorrect"
            :input-id="inputId"
            :is-x-axis-input="isXAxisInput"
            :math-char-button-width="mathCharButtonWidth"
        />

        <MathCharacterButton
            v-if="isRadiansEnabled && !isXAxisInput"
            :is-focused="isFocused && !isCorrect"
            :math-character-button-width="mathCharButtonWidth"
            @add-pi-character="addPiSymbolToInput"
        />
    </div>
</template>

<style scoped>

#inputBoxContainer {
    transform: v-bind("baseTranslate");
}

@media (min-width: 640px) {
    #inputBoxContainer {
        transform: v-bind("mediumTranslate");
    }
}

@media (min-width: 1024px) {
    #inputBoxContainer {
        transform: v-bind("largeTranslate");
    }
}

</style>

