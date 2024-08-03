<template>
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.initialAngle" />
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.supplementaryAngle" />
</template>

<script setup lang="ts">

import { defineProps } from 'vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import type { CoordinatesOfAngle } from '@/shared_types';

const props = defineProps<{
    coordinates: CoordinatesOfAngle
}>();

const { coordinates } = props;
console.log(coordinates)

</script>

