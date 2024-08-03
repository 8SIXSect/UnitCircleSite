<script setup lang="ts">

import { computed, type ComputedRef } from 'vue';
import DrawPairOfLinesForSlopeOfAngle from './DrawPairOfLinesForSlopeOfAngle.vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import type { CoordinatesOfAngle, LineCoordinates } from '@/shared_types';


// note: SVG has reversed (or inverted?) coordinates so (r2/2, r2/2) is where (-r2/2, r2/2) should be

/**
    * Coordinates to draw the x-axis
*/           
const xAxis: ComputedRef<LineCoordinates> = computed(() => ({
    x1: -1, y1: 0, x2: 1, y2: 0
}));


/**
    * Coordinates to draw the y-axis
*/
const yAxis: ComputedRef<LineCoordinates> = computed(() => ({
    x1: 0, y1: -1, x2: 0, y2: 1
}));


/**
    * Orders the coordinates in a way so that their slopes can be drawn
    * @param posX positive X coordinate
    * @param posY positive Y coordinate
    * @returns CoordinatesOfAngle object
*/
const buildCoordinatesOfAngle = (posX: number, posY: number): CoordinatesOfAngle => {
    const negX: number = posX * -1;
    const negY: number = posY * -1;

    return {
        initialAngle: { x1: posX, y1: posY, x2: negX, y2: negY },
        supplementaryAngle: { x1: negX, y1: posY, x2: posX, y2: negY }
    };   
};


/**
    * Coordinates for the slopes of 30 degrees & 150 degrees
*/
const thirtyDegrees: ComputedRef<CoordinatesOfAngle> = computed(() => {
    const posX: number = Math.sqrt(3);
    const posY: number = 1/2;

    return buildCoordinatesOfAngle(posX, posY);
});


/**
    * Coordinates for the slopes of 45 degrees & its supplementary angle, 135 degrees
*/
const fourtyFiveDegrees: ComputedRef<CoordinatesOfAngle> = computed(() => {  
    const posX: number = Math.SQRT2 / 2;
    const posY: number = posX;
     
    return buildCoordinatesOfAngle(posX, posY);
});


/**
    * Coordinates for the slopes of 60 degrees & 120 degrees
*/
const sixtyDegrees: ComputedRef<CoordinatesOfAngle> = computed(() => {
    const posX: number = 1/2;
    const posY: number = Math.sqrt(3);

    return buildCoordinatesOfAngle(posX, posY);
});

</script>

<template>
    <div class="h-screen flex justify-center items-center">
        <svg viewBox="-1 -1 2 2">
            <DrawSingleLineForSlopeOfAngle :coordinates="xAxis" />
            <DrawSingleLineForSlopeOfAngle :coordinates="yAxis" />

            <DrawPairOfLinesForSlopeOfAngle :coordinates="thirtyDegrees" />
            <DrawPairOfLinesForSlopeOfAngle :coordinates="fourtyFiveDegrees" />
            <DrawPairOfLinesForSlopeOfAngle :coordinates="sixtyDegrees" />
        </svg>
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

