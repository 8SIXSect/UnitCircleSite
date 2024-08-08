<script setup lang="ts">

import { computed, type ComputedRef } from 'vue';
import DrawPairOfLinesForSlopeOfAngle from './DrawPairOfLinesForSlopeOfAngle.vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import InputBoxForRadians from './InputBoxForRadians.vue';
import CheckNumbersInCircleButton from './CheckNumbersInCircleButton.vue';
import { type OrderedPair, type CoordinatesOfAngle, type LineCoordinates, asViewWidth } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';

// note: SVG has reversed (or inverted?) coordinates so (r2/2, r2/2) is where (-r2/2, r2/2) should be


const store = useInputDataStore();
const { currentlyFocusedInput } = storeToRefs(store);

/**
    * Represents the diameter/width of the Unit Circle in `vw` units
*/
const unitCircleDiameter = 40;


/**
    * The CSS style will bind its height & width to this number
*/
const unitCircleDiameterWithUnit = asViewWidth(unitCircleDiameter);


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


type ComputedAngleCoords = ComputedRef<CoordinatesOfAngle>;


/**
    * Orders the coordinates in a way so that their slopes can be drawn
    * @param positivePoint an ordered pair that represents the positive
    * x's and y's of the coordinates for the angle
    * @returns CoordinatesOfAngle object
*/
const buildComputedCoordinatesOfAngle = (positivePoint: OrderedPair): ComputedAngleCoords => {
    const negX: number = positivePoint.x * -1;
    const negY: number = positivePoint.y * -1;
    
    return computed(() => ({     
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
    }));
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
    buildComputedCoordinatesOfAngle(thirtyDegreesPair),
    buildComputedCoordinatesOfAngle(fortyFiveDegreesPair),
    buildComputedCoordinatesOfAngle(sixtyDegreesPair)
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


</script>

<template>
    <div class="flex justify-center items-center my-8">
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

