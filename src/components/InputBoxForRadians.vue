<script setup lang="ts">

import type { OrderedPair } from '@/shared_types';
import { type Ref, defineProps, ref, watch, onMounted, inject } from 'vue';


const props = defineProps<{
    coordinatesForInput: OrderedPair,
    inputId: number
}>();


const { coordinatesForInput, inputId } = props;

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
        const inputValue: string = event.target.value;
        const filteredValue: string = inputValue.replace(/[^0-9/π]/g, "");
        inputBoxRef.value = filteredValue;
    }
};


// TODO: make 25vw dynamic and depend on a constant for the radius/diameter
// 25(vw) is used because that's the radius of the Unit Circle here
const translateX: number = 25 * coordinatesForInput.x;
const translateY: number = 25 * coordinatesForInput.y;


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
onMounted(() => {
    if ((mathCharacterButtonRef.value !== null) && (dummyDivRef.value !== null)) {
        dummyDivRef.value.style.width = `${mathCharacterButtonRef.value.offsetWidth}px`;
    }
});


/**
    * Provided by UnitCircle
    * It's a number used to identify the input that is currerntly focused
    * The number is the input's index which is also it's `inputId`
*/
const currentlyFocusedInput = inject("currentlyFocusedInput") as Ref<number | null>;


/**
    * Sets the visibility of the html button: #mathCharacterButton
*/
const setMathCharacterButtonVisibility = (visibility: "visible" | "hidden"): void => {
    if (mathCharacterButtonRef.value !== null) {
        mathCharacterButtonRef.value.style.visibility = visibility;
    }
};


/**
    * Whenever this input box is focused, its math button needs to be visible
    * Also, this func will be set as the currently focused input
*/
const whenInputIsFocused = () => {
    currentlyFocusedInput.value = inputId;
    setMathCharacterButtonVisibility("visible");
};


// If there's a new current input but it's not the same as the original, then
// it is set to hidden
watch(currentlyFocusedInput, (currentValue: number | null, previousValue: number | null) => {
    if ((inputId === previousValue) && (previousValue !== currentValue)) {
        setMathCharacterButtonVisibility("hidden");
    }
});


</script>

<template>
    <div id="inputBoxParentDiv" :style="divModifiedStyle">
        <div ref="dummyDivRef" id="dummyDiv"></div>
        <input
            class="rounded"
            v-model="inputBoxRef"
            :maxlength="inputBoxMaxLength"
            @input="sanitizeInput"
            @focus="whenInputIsFocused"
            />
        <button
            ref="mathCharacterButtonRef"
            id="mathCharacterButton"
            class="invisible"
            >π</button>
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

