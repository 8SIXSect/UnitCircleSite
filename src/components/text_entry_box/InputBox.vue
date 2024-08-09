<script setup lang="ts">

import MathCharacterButton from './MathCharacterButton.vue';
import type { OrderedPair } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import type { StyleValue } from 'vue';
import { computed, inject } from 'vue';
import { ref } from 'vue';


const PI_SYMBOL = inject("PI_SYMBOL") as string;

const store = useInputDataStore();


const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    inputId: number,
    unitCircleDiameter: number
}>();


const { coordinatesForInput, inputId, unitCircleDiameter } = props;


// TODO: add default value of pi or like a placeholder
// TODO: when you add modes, this will need to depend on some state & input's width
// should be equal to this so add that
const inputBoxModel = ref<string>("");
const inputBoxMaxLength = ref<number>(5);
const inputBoxWidth = `${inputBoxMaxLength.value + 2}ch`


/**
    * Prevents the user from inputting invalid characters
*/
const sanitizeInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        
        // Allows: digits, '/' and pi symbol
        const patternForReplacement: RegExp = /[^0-9/π]/g;
        const inputValue: string = event.target.value;
        
        inputBoxModel.value = inputValue.replace(patternForReplacement, "");
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

const mathCharButtonWidth = "1ch";

const getMarginLeft = computed(() => props.isFocused ? mathCharButtonWidth : "0px");


/**
    * Purpose is to write a pi symbol in the inputBox when this button is clicked
*/
const addPiSymbolToInput = () => {
    if (inputBoxModel.value.length < inputBoxMaxLength.value) {
        inputBoxModel.value += PI_SYMBOL;
    }
}

</script>

<template>
    <div id="inputBoxParentDiv" :style="divModifiedStyle">
        <input
            class="rounded"
            v-model="inputBoxModel"
            :style="{ marginLeft: getMarginLeft }"
            :maxlength="inputBoxMaxLength"
            @input="sanitizeInput"
            @focus="store.focusInput(inputId)"
            />
        <MathCharacterButton
            :is-focused="isFocused"
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

