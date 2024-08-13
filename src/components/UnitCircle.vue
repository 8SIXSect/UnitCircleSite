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
import { inject } from 'vue';
import UnitCircleMode from './unit_circle/UnitCircleMode.vue';
import type { StyleValue } from 'vue';


const store = useInputDataStore();
const { currentlyFocusedInput, correctInputIds } = storeToRefs(store);

const asViewWidth = inject("asViewWidth") as (rawNumber: number) => string;


/**
    * Represents the diameter/width of the Unit Circle in `vw` units
*/
const unitCircleDiameter = 40;


/**
    * CSS styles used to bind the width & height of the unit circle to constants
*/
const unitCircleStyles: StyleValue = {
    width: asViewWidth(unitCircleDiameter),
    height: asViewWidth(unitCircleDiameter)
}


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

</script>

<template>
    <UnitCircleMode />
    <div class="flex justify-center items-center my-8">
        <svg viewBox="-1 -1 2 2" class="border border-solid border-black rounded-full" :style="unitCircleStyles">
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
            :unit-circle-diameter="unitCircleDiameter"
            />

    </div>
</template>

