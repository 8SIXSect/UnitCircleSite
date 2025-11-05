<script setup lang="ts">

import DrawSingleLineForSlopeOfAngle from './DrawSingleLineForSlopeOfAngle.vue';
import type {CoordinatesOfAngle} from '@/components/unit_circle/unit_circle_calculations';

const props = defineProps<{
    coordinates: CoordinatesOfAngle
}>();

// I believe destructing the props here is doing something with reactivity, so be cautious
const {coordinates} = props;

</script>

<template>
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.initialAngle"/>
    <DrawSingleLineForSlopeOfAngle :coordinates="coordinates.supplementaryAngle"/>
</template>

