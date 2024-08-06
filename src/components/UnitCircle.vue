<script setup lang="ts">

import { computed, provide, ref, type ComputedRef, type Ref } from 'vue';
import DrawPairOfLinesForSlopeOfAngle from './DrawPairOfLinesForSlopeOfAngle.vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import InputBoxForRadians from './InputBoxForRadians.vue';
import type { OrderedPair, CoordinatesOfAngle, LineCoordinates } from '@/shared_types';


// note: SVG has reversed (or inverted?) coordinates so (r2/2, r2/2) is where (-r2/2, r2/2) should be


const xAxisNegativePair: OrderedPair = { x: -1, y: 0 };
const xAxisPositivePair: OrderedPair = { x: 1, y: 0 };

const yAxisNegativePair: OrderedPair = { x: 0, y: -1 };
const yAxisPositivePair: OrderedPair = { x: 0, y: 1 };


/**
    * Coordinates to draw the x-axis
*/
const xAxis: ComputedRef<LineCoordinates> = computed(() => ({
    startPoint: xAxisNegativePair,
    endPoint: xAxisPositivePair
}));


/**
    * Coordinates to draw the y-axis
*/
const yAxis: ComputedRef<LineCoordinates> = computed(() => ({
    startPoint: yAxisNegativePair,
    endPoint: yAxisPositivePair
}));



/**
    * Orders the coordinates in a way so that their slopes can be drawn
    * @param positivePoint an ordered pair that represents the positive
    * x's and y's of the coordinates for the angle
    * @returns CoordinatesOfAngle object
*/
const buildCoordinatesOfAngle = (positivePoint: OrderedPair): CoordinatesOfAngle => {
    const negX: number = positivePoint.x * -1;
    const negY: number = positivePoint.y * -1;

    return {
        initialAngle: {
            startPoint: {
                x: positivePoint.x, y: positivePoint.y,
            },
            endPoint: {
                x: negX, y: negY
            }
        },
        supplementaryAngle: {
            startPoint: {
                x: negX, y: positivePoint.y,
            },
            endPoint: {
                x: positivePoint.x, y: negY
            }
        }
    };   
};


type ComputedAngleCoords = ComputedRef<CoordinatesOfAngle>;


/**
    * Helper function to build a CoordinatesOfAngle object from an orderedPair
    * and then turn it into a computed object
*/
const createAndComputeCoordinatesOfAngle = (orderedPair: OrderedPair): ComputedAngleCoords => {
    // TODO: Combine this func w/ buildCoordinates and refactor
    return computed(() => buildCoordinatesOfAngle(orderedPair));
};


const thirtyDegreesPair: OrderedPair = {
    x: Math.sqrt(3) / 2,
    y: 1 / 2
};


const fortyFiveDegreesPair: OrderedPair = {
    x: Math.SQRT2 / 2,
    y: Math.SQRT2 / 2
};


const sixtyDegreesPair: OrderedPair = {
    x: 1 / 2,
    y: Math.sqrt(3) / 2
};


/**
    * Angle Coordinates for the slopes of the following angles:
    * - 30 degrees & 150 degrees
    * - 45 degrees & 135 degrees
    * - 60 degrees & 120 degrees
*/
const computedAngleCoordsToDraw: ComputedAngleCoords[] = [
    createAndComputeCoordinatesOfAngle(thirtyDegreesPair),
    createAndComputeCoordinatesOfAngle(fortyFiveDegreesPair),
    createAndComputeCoordinatesOfAngle(sixtyDegreesPair)
];


/**
    * Returns every variation of a given ordered pair including the given pair
    * in: (1, 1)
    * out: [(1, 1), (-1, 1), (1, -1), (-1, -1)]
*/
const getAllPairsFromOriginalPair = (orderedPair: OrderedPair): OrderedPair[] => {

    const negX = (pair: OrderedPair): OrderedPair => ({
        x: pair.x * -1,
        y: pair.y
    });

    const negY = (pair: OrderedPair): OrderedPair => ({
        x: pair.x,
        y: pair.y * -1
    });

    return [
        orderedPair,
        negX(orderedPair),
        negY(orderedPair),
        negX(negY(orderedPair))
    ];
};


/**
    * OrderedPair Coordinates for the points where input boxes will be put
*/
const coordinatesForInputBoxes: OrderedPair[] = [
    xAxisPositivePair, xAxisNegativePair,
    yAxisPositivePair, yAxisNegativePair,

    ...getAllPairsFromOriginalPair(thirtyDegreesPair),
    ...getAllPairsFromOriginalPair(fortyFiveDegreesPair),
    ...getAllPairsFromOriginalPair(sixtyDegreesPair)
];


/**
    * Represents the index/id of the currently focused input
    * The number acts as a way of identifying which input is currently focused
*/
const currentlyFocusedInput = ref<number | null>(null);


provide("currentlyFocusedInput", currentlyFocusedInput);


</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <svg viewBox="-1 -1 2 2">
            <DrawSingleLineForSlopeOfAngle :coordinates="xAxis" />
            <DrawSingleLineForSlopeOfAngle :coordinates="yAxis" />

            <DrawPairOfLinesForSlopeOfAngle
                v-for="(angleCoordinates, index) in computedAngleCoordsToDraw"
                :key="index"
                :coordinates="angleCoordinates.value"
                />
        </svg>

        <InputBoxForRadians
            v-for="(orderedPairForInputBox, index) in coordinatesForInputBoxes"
            :key="index"
            :coordinates-for-input="orderedPairForInputBox"
            :input-id="index"
            />
    </div>
</template>

<style scoped>

svg {
    width: 50vw;
    height: 50vw;

    border-radius: 50%;
    border: 1px solid black;
}

.section {
    stroke: black;
    stroke-width: 1;
}

.circle {
    fill: none;
    stroke: black;
    stroke-width: 2;
}

</style>

