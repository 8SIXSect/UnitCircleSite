<script setup lang="ts">

import { computed } from 'vue';
import DrawPairOfLinesForSlopeOfAngle from '../DrawPairOfLinesForSlopeOfAngle.vue';
import DrawSingleLineForSlopeOfAngle from '../DrawSingleLineForSlopeOfAngle.vue';
import InputBox from '../text_entry_box/InputBox.vue';
import CheckNumbersInCircleButton from '../CheckNumbersInCircleButton.vue';
import {
    yAxis, xAxis, buildCoordinatesOfAngle,
    thirtyDegreesPair, fortyFiveDegreesPair, sixtyDegreesPair,
    coordinatesForInputBoxes
} from './unit_circle_calculations'; 
import { type CoordinatesOfAngle } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';


const store = useInputDataStore();
const { currentlyFocusedInput } = storeToRefs(store);

const asViewWidth = inject("asViewWidth") as (rawNumber: number) => string;


/**
    * Represents the diameter/width of the Unit Circle in `vw` units
*/
const unitCircleDiameter = 40;


/**
    * The CSS style will bind its height & width to this number
*/
const unitCircleDiameterWithUnit = asViewWidth(unitCircleDiameter);



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

</script>

<template>
    <div class="flex justify-center items-center my-8">
        <svg viewBox="-1 -1 2 2">
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
            :input-id="index"
            :unit-circle-diameter="unitCircleDiameter"
            />

    </div>
    <CheckNumbersInCircleButton />
</template>

<style scoped>


svg {
    height: v-bind("unitCircleDiameterWithUnit");
    width: v-bind("unitCircleDiameterWithUnit");

    border-radius: 50%;
    border: 1px solid black;
}

</style>

