<script setup lang="ts">

import type { OrderedPair } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import { watch } from 'vue';
import { type Ref, defineProps, ref, onMounted, inject } from 'vue';


const store = useInputDataStore();


/**
    * This is the PI character
*/
const PI_SYMBOL = inject("PI_SYMBOL") as string;


const props = defineProps<{
    coordinatesForInput: OrderedPair,
    isFocused: boolean,
    inputId: number,
    unitCircleDiameter: number
}>();


const { coordinatesForInput, inputId, unitCircleDiameter } = props;


// TODO: add default value of pi or like a placeholder
const inputBoxRef: Ref<string> = ref<string>("");

// TODO: when you add modes, this will need to depend on some state & input's width
// should be equal to this so add that
const inputBoxMaxLength: Ref<number> = ref<number>(5);
const inputBoxWidth: string = `${inputBoxMaxLength.value + 2}ch`


/**
    * Prevents the user from inputting invalid characters
*/
const sanitizeInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        
        // Allows: digits, '/' and pi symbol
        const patternForReplacement: RegExp = /[^0-9/π]/g;
        const inputValue: string = event.target.value;
        
        inputBoxRef.value = inputValue.replace(patternForReplacement, "");
    }
};


/**
    * Represents the radius of the unit circle.
    * This value is then used to move InputBox according to a coordinate pair
*/
const unitCircleRadius: number = unitCircleDiameter / 2;
const translateX: number = unitCircleRadius * coordinatesForInput.x;
const translateY: number = unitCircleRadius * coordinatesForInput.y;


/**
    * Translate will position the input in desired location on the Unit Circle
*/
const divModifiedStyle = {
    transform: `translate(${translateX}vw, ${translateY}vw)`
};


/**
    * Purpose: Math button puts the input box off-center so I used a div that's
    * invisible and set its width after the math char button's width is computed
*/
const dummyDivRef = ref<HTMLDivElement | null>(null);
const mathCharacterButtonRef = ref<HTMLButtonElement | null>(null);


// Purpose: dynamically adjusts the width of `dummyDiv`
watch(dummyDivRef, () => {
    if (dummyDivRef.value === null) return;
    if (mathCharacterButtonRef.value === null) return;

    dummyDivRef.value.style.width = `${mathCharacterButtonRef.value.offsetWidth}px`;

})

/**
    * Whenever this input box is focused, its math button needs to be visible
    * Also, this func will be set as the currently focused input
*/
const whenInputIsFocused = () => {
    store.currentlyFocusedInput = inputId;
};


/**
    * Purpose is to write a pi symbol in the inputBox when this button is clicked
*/
const whenMathCharacterButtonIsClicked = () => {
    if (inputBoxRef.value.length < inputBoxMaxLength.value) {
        inputBoxRef.value += PI_SYMBOL;
    }
}


</script>

<template>
    <div id="inputBoxParentDiv" :style="divModifiedStyle">
        <div v-if="isFocused" ref="dummyDivRef" id="dummyDiv"></div>
        <input
            class="rounded"
            v-model="inputBoxRef"
            :maxlength="inputBoxMaxLength"
            @input="sanitizeInput"
            @focus="whenInputIsFocused"
            />
        <button
            v-if="isFocused"
            ref="mathCharacterButtonRef"
            id="mathCharacterButton"
            @click="whenMathCharacterButtonIsClicked"
            >{{ PI_SYMBOL }}</button>
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

