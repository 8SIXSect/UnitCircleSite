<script setup lang="ts">

import { computed } from 'vue';
import DrawSingleLineForSlopeOfAngle from './unit_circle/DrawSingleLineForSlopeOfAngle.vue';
import DrawPairOfLinesForSlopeOfAngle from './unit_circle/DrawPairOfLinesForSlopeOfAngle.vue';
import InputBox from './text_entry_box/InputBox.vue';
import {
    yAxis, xAxis, buildCoordinatesOfAngle,
    thirtyDegreesPair, fortyFiveDegreesPair, sixtyDegreesPair,
    coordinatesForInputBoxes, type CoordinatesOfAngle
} from './unit_circle/unit_circle_calculations'; 
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';
import UnitCircleMode from './unit_circle/UnitCircleMode.vue';


const store = useInputDataStore();
const { currentlyFocusedInput, correctInputIds } = storeToRefs(store);


/**
    * Angle Coordinates for the slopes of the following angles:
    * - 30 degrees & 150 degrees
    * - 45 degrees & 135 degrees
    * - 60 degrees & 120 degrees
*/
const computedAngleCoordsToDraw = computed<CoordinatesOfAngle[]>(() => ([
    buildCoordinatesOfAngle(thirtyDegreesPair),
    buildCoordinatesOfAngle(fortyFiveDegreesPair),
    buildCoordinatesOfAngle(sixtyDegreesPair)
]));


/**
    * Returns a boolean meaning whether the input box for the `inputId` has a
    * correct value
*/
const isInputCorrect = (inputId: number): boolean => {
    return correctInputIds.value.includes(inputId);
};


const maxDiameterForUnitCircle = 80;

</script>

<template>
    <UnitCircleMode />
    <div class="flex justify-center items-center mb-16 mt-24">
        <svg 
            viewBox="-1 -1 2 2"
            class="border border-solid border-black rounded-full"
            ref="unitCircleRef"
            id="unitCircle">

            <DrawSingleLineForSlopeOfAngle :coordinates="xAxis" />
            <DrawSingleLineForSlopeOfAngle :coordinates="yAxis" />

            <DrawPairOfLinesForSlopeOfAngle
                v-for="(angleCoordinates, index) in computedAngleCoordsToDraw"
                :key="index"
                :coordinates="angleCoordinates"
                />
        </svg>

        <InputBox
            v-for="(orderedPairForInputBox, index) in coordinatesForInputBoxes"
            :key="index"
            :coordinates-for-input="orderedPairForInputBox"
            :is-focused="index === currentlyFocusedInput"
            :is-correct="isInputCorrect(index)"
            :input-id="index"
            :max-diameter-for-circle="maxDiameterForUnitCircle"
            />
    </div>
</template>

<style lang="scss">

@import "@/styles/widths.module.scss";

#unitCircle {
    width: $base;

    @media (min-width: 1024px) {
        width: $large;
    }
}

</style>

