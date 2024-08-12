<script setup lang="ts">
import type { CoordinatesOfLine } from '@/components/unit_circle/unit_circle_calculations';


const props = defineProps<{
    coordinates: CoordinatesOfLine
}>();

const { coordinates } = props;

</script>

<template>
    <line
        :x1="coordinates.startPoint.x"
        :y1="coordinates.startPoint.y"
        :x2="coordinates.endPoint.x"
        :y2="coordinates.endPoint.y"
        stroke="black"
        stroke-width="0.005"
    />
</template>

