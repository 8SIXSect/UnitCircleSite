<script setup lang="ts">

import MathCharacterButton from './MathCharacterButton.vue';
import type { OrderedPair } from '@/components/unit_circle/unit_circle_calculations';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';
import type { StyleValue } from 'vue';
import { computed, inject } from 'vue';
import styles from "@/styles/widths.module.scss";

const PI_SYMBOL = inject("PI_SYMBOL") as string;


const store = useInputDataStore();
const { userInputValues, isRadiansEnabled, maxLengthForInputBox } = storeToRefs(store);

const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    isCorrect: boolean,
    inputId: number
}>();


const { coordinatesForInput, inputId } = props;


// TODO: add default value of pi or like a placeholder
const inputBoxWidth = computed<string>(() => `${maxLengthForInputBox.value + 1}ch`);


/**
    * Prevents the user from inputting invalid characters
*/
const sanitizeInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        
        // When in rad. mode, allow for pi-symbol & slash symbol (division)
        const patternForReplacement: RegExp = (
            isRadiansEnabled.value ? /[^0-9/π]/g : /[^0-9]/g
        );

        const inputValue: string = event.target.value;
        userInputValues.value[inputId] = inputValue.replace(patternForReplacement, "");
    }
};


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
    Math.abs(coordinatesForInput.x) === (1/2) ? 1.03 : 1.0
);


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


const inputBoxStyle = computed<StyleValue>(() => {

    const conditionsForMargin: boolean = (
        isRadiansEnabled.value && props.isFocused && !props.isCorrect
    )

    // When inputId is 0, having button on right side is bad
    const marginLeft: string = (
        conditionsForMargin && !isXAxisInput ? mathCharButtonWidth : "0px"
    );
    
    return {
        marginLeft: marginLeft,
        backgroundColor: props.isCorrect ? "gray" : "white",
        width: inputBoxWidth.value
    }
});


/**
    * These are the tailwind classes that will be used for the input box
*/
const inputBoxClasses = computed(() => {
    const addClass = (className: string) => ({ [className]: true });

    return {
        ...(isRadiansEnabled.value && props.isFocused ? addClass("rounded-l") : addClass("rounded")),
        ...addClass("text-center"),
        ...addClass("p-0"),
        ...addClass("outline-none"),
        ...addClass("border"), ...addClass("border-solid"), ...addClass("border-black"),
        ...addClass("text-md"),
    };
});


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
        <input
            :class="inputBoxClasses"
            v-model="userInputValues[inputId]"
            :style="inputBoxStyle"
            :maxlength="maxLengthForInputBox"
            :disabled="isCorrect"
            @input="sanitizeInput"
            @focus="store.focusInput(inputId)"
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

