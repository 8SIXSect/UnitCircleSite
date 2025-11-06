<script setup lang="ts">

import {useInputDataStore} from '@/stores/inputData';
import {storeToRefs} from 'pinia';
import type {StyleValue} from 'vue';
import {computed} from 'vue';

const store = useInputDataStore();
const {userInputValues, isRadiansEnabled, maxLengthForInputBox} = storeToRefs(store);

const props = defineProps<{
    isFocused: boolean,
    isCorrect: boolean,
    inputId: number,
    isXAxisInput: boolean,
    mathCharButtonWidth: string
}>();

const {inputId} = props;

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

const inputBoxStyle = computed<StyleValue>(() => {

    const conditionsForMargin: boolean = (
        isRadiansEnabled.value && props.isFocused && !props.isCorrect
    )

    // When inputId is 0, having button on right side is bad
    const marginLeft: string = (
        conditionsForMargin && !props.isXAxisInput ? props.mathCharButtonWidth : "0px"
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
    const addClass = (className: string) => ({[className]: true});

    return {
        ...(isRadiansEnabled.value && props.isFocused ? addClass("rounded-l") : addClass("rounded")),
        ...addClass("text-center"),
        ...addClass("p-0"),
        ...addClass("outline-none"),
        ...addClass("border"), ...addClass("border-solid"), ...addClass("border-black"),
        ...addClass("text-md"),
        ...addClass("unit-circle-input-box"),  // used for e2e testing
    };
});

</script>

<template>
    <input
        :class="inputBoxClasses"
        v-model="userInputValues[inputId]"
        :style="inputBoxStyle"
        :maxlength="maxLengthForInputBox"
        :disabled="isCorrect"
        @input="sanitizeInput"
        @focus="store.focusInput(inputId)"
    />
</template>

<style scoped>
</style>
