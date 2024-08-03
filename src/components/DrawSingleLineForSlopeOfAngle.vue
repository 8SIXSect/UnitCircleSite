<template>
    <line
        :x1="coordinates.x1"
        :y1="coordinates.y1"
        :x2="coordinates.x2"
        :y2="coordinates.y2"
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

