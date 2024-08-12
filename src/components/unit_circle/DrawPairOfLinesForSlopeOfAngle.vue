<script setup lang="ts">

import { defineProps } from 'vue';
import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import type { CoordinatesOfAngle } from '@/components/unit_circle/unit_circle_calculations';

const props = defineProps<{
    coordinates: CoordinatesOfAngle
}>();

const { coordinates } = props;

</script>

<template>
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.initialAngle" />
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.supplementaryAngle" />
</template>

