<script setup lang="ts">

import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
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


// default value of pi or like a placeholder
const thirtyDegreesInputForRadians: Ref<string> = ref<string>("");

/**
    * Prevents the user from inputting invalid characters
*/
const sanitizeInput = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        const inputValue: string = event.target.value;
        const filteredValue: string = inputValue.replace(/[^0-9/piπ]/g, "");
        thirtyDegreesInputForRadians.value = filteredValue;
    }
};

// Purpose: watch for input change and replace "pi" with pi symbol
watch(thirtyDegreesInputForRadians, (currentValue: string) => {
    const patternForReplacement: RegExp = /pi/gi;
    thirtyDegreesInputForRadians.value = currentValue.replace(patternForReplacement, "π");
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

            <circle cx="0" cy="0" r="0.2" stroke="black" stroke-width="0.005" fill="none" />
        </svg>
        <input class="rounded" v-model="thirtyDegreesInputForRadians" @input="sanitizeInput" />
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

input {
    position: absolute;
    transform: translate(400%, -60%);
    z-index: 10;

    outline: none;
    border: 1px solid black;
    width: 2.5vw;
    padding: 0;
    text-align: center;
}

</style>

