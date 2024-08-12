<script setup lang="ts">

import UnitCircle from './components/UnitCircle.vue';
import GameCompletedOverlay from './components/GameCompletedOverlay.vue';
import { useInputDataStore } from './stores/inputData';
import { storeToRefs } from 'pinia';
import CheckNumbersInCircleButton from './components/CheckNumbersInCircleButton.vue';

const store = useInputDataStore();

const { correctInputIds } = storeToRefs(store);

</script>

<template>
    <GameCompletedOverlay v-if="correctInputIds.length >= 2" />
    <UnitCircle />
    <CheckNumbersInCircleButton />
</template>
