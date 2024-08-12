<script setup lang="ts">

import MathCharacterButton from './MathCharacterButton.vue';
import type { OrderedPair } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';
import type { StyleValue } from 'vue';
import { computed, inject } from 'vue';


const PI_SYMBOL = inject("PI_SYMBOL") as string;

const store = useInputDataStore();
const { userInputValues, isRadiansEnabled, maxLengthForInputBox } = storeToRefs(store);

const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    isCorrect: boolean,
    inputId: number,
    unitCircleDiameter: number
}>();


const { coordinatesForInput, inputId, unitCircleDiameter } = props;


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
    * This value is then used to move InputBox according to a coordinate pair
*/
const unitCircleRadius: number = unitCircleDiameter / 2;
const translateX: number = unitCircleRadius * coordinatesForInput.x;
const translateY: number = unitCircleRadius * coordinatesForInput.y;


/**
    * Translate will position the input in desired location on the Unit Circle
*/
const divModifiedStyle: StyleValue = {
    transform: `translate(${translateX}vw, ${translateY}vw)`
};


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
        backgroundColor: props.isCorrect ? "gray" : "white"
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
    <div id="inputBoxParentDiv" :style="divModifiedStyle">
        <input
            class="rounded"
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

<style scoped>

#inputBoxParentDiv {
    position: absolute;
    z-index: 10;
    display: flex;
}

input {
    z-index: inherit;
    text-align: center;
    padding: 0;

    outline: none;
    border: 1px solid black;
    width: v-bind("inputBoxWidth");
}

</style>

