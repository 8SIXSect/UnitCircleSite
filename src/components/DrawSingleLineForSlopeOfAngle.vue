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

<script setup lang="ts">
import type { LineCoordinates } from '@/shared_types';


const props = defineProps<{
    coordinates: LineCoordinates
}>();

const { coordinates } = props;

</script>

