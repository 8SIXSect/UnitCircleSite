<script setup lang="ts">

import { computed, ref, type ComputedRef, type Ref } from 'vue';
import DrawPairOfLinesForSlopeOfAngle from './DrawPairOfLinesForSlopeOfAngle.vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import InputBoxForRadians from './InputBoxForRadians.vue';
import type { OrderedPair, CoordinatesOfAngle, LineCoordinates } from '@/shared_types';


// note: SVG has reversed (or inverted?) coordinates so (r2/2, r2/2) is where (-r2/2, r2/2) should be

/**
    * Coordinates to draw the x-axis
*/
const xAxis: ComputedRef<LineCoordinates> = computed(() => ({
    startPoint: { x: -1, y: 0 },
    endPoint: { x: 1, y: 0 }
}));


/**
    * Coordinates to draw the y-axis
*/
const yAxis: ComputedRef<LineCoordinates> = computed(() => ({
    startPoint: { x: 0, y: -1 },
    endPoint: { x: 0, y: 1 }
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


/**
    * Coordinates for the slopes of 30 degrees & 150 degrees
*/
const thirtyDegrees: ComputedAngleCoords = createAndComputeCoordinatesOfAngle({
    x: Math.sqrt(3) / 2,
    y: 1/2
});


/**
    * Coordinates for the slopes of 45 degrees & its supplementary angle, 135 degrees
*/
const fortyFiveDegrees: ComputedAngleCoords = createAndComputeCoordinatesOfAngle({
    x: Math.SQRT2 / 2,
    y: Math.SQRT2 / 2
});


/**
    * Coordinates for the slopes of 60 degrees & 120 degrees
*/
const sixtyDegrees: ComputedAngleCoords = createAndComputeCoordinatesOfAngle({
    x: 1 / 2,
    y: Math.sqrt(3) / 2
});


const thirtyDegreesUnitCircleCoordinates: OrderedPair = { x: 1, y: 0 };

</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <svg viewBox="-1 -1 2 2">
            <DrawSingleLineForSlopeOfAngle :coordinates="xAxis" />
            <DrawSingleLineForSlopeOfAngle :coordinates="yAxis" />

            <DrawPairOfLinesForSlopeOfAngle :coordinates="thirtyDegrees" />
            <DrawPairOfLinesForSlopeOfAngle :coordinates="fortyFiveDegrees" />
            <DrawPairOfLinesForSlopeOfAngle :coordinates="sixtyDegrees" />

            <!--
            <circle cx="0" cy="0" r="0.2" stroke="black" stroke-width="0.005" fill="none" />
            -->
        </svg>

        <InputBoxForRadians :coordinates-for-input="thirtyDegreesUnitCircleCoordinates" />
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

