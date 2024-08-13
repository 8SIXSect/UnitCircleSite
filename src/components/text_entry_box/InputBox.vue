<script setup lang="ts">

import MathCharacterButton from './MathCharacterButton.vue';
import type { OrderedPair } from '@/components/unit_circle/unit_circle_calculations';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';
import type { StyleValue } from 'vue';
import { computed, inject } from 'vue';


const PI_SYMBOL = inject("PI_SYMBOL") as string;


interface CustomConfig {
    theme: {
        extend: {
            width: {
                base: string
            }
        }
    }
}

const TW_CONFIG = inject("TW_CONFIG") as CustomConfig;

const store = useInputDataStore();
const { userInputValues, isRadiansEnabled, maxLengthForInputBox } = storeToRefs(store);

const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    isCorrect: boolean,
    inputId: number,
    unitCircleDiameter: number
}>();


const { coordinatesForInput, inputId } = props;


// TODO: add default value of pi or like a placeholder
const inputBoxWidth = computed<string>(() => `${maxLengthForInputBox.value + 2}ch`);


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
const divModifiedStyle = computed<StyleValue>(() => {
    const unitCircleRadius: number = props.unitCircleDiameter / 2;
    const translateX: number = unitCircleRadius * coordinatesForInput.x;
    let translateY: number = unitCircleRadius * coordinatesForInput.y;

    const baseWidth = parseFloat(TW_CONFIG.theme.extend.width.base);
    const xEqualsRootTwoOverTwo = Math.abs(coordinatesForInput.x) === Math.SQRT2 / 2;
    
    /*
        * Purpose: if the current diameter/width of the unit circle is the base
        * width used for my tailwind styles, and if this current input box is
        * one of the 45 degree angle ones on the unit circle, then we want to
        * change the translated y-value so that it looks neater for the user
    */
    if (baseWidth === props.unitCircleDiameter && xEqualsRootTwoOverTwo ) {
        translateY *= .95;
    }

    return {
        transform: `translate(${translateX}vw, ${translateY}vw)`
    }
});


/**
    * The math character button is only going to be the PI symbol which is a single
    * character
*/
const mathCharButtonWidth = "1ch";

const inputBoxStyle = computed<StyleValue>(() => {

    const marginLeft: string = (
        isRadiansEnabled.value && props.isFocused && !props.isCorrect ?
        mathCharButtonWidth : "0px"
    );

    return {
        marginLeft: marginLeft,
        backgroundColor: props.isCorrect ? "gray" : "white",
        width: inputBoxWidth.value
    }
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
    <div class="flex absolute z-10" :style="divModifiedStyle">
        <input
            class="rounded text-center p-0 outline-none border border-solid border-black text-md"
            v-model="userInputValues[inputId]"
            :style="inputBoxStyle"
            :maxlength="maxLengthForInputBox"
            :disabled="isCorrect"
            @input="sanitizeInput"
            @focus="store.focusInput(inputId)"
            />

        <MathCharacterButton
            v-if="isRadiansEnabled"
            :is-focused="isFocused && !isCorrect"
            :math-character-button-width="mathCharButtonWidth"
            @add-pi-character="addPiSymbolToInput"
            />
    </div>
</template>

