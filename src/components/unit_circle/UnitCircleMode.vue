<script setup lang="ts">

import UnitCircleModeButton from './UnitCircleModeButton.vue';
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';


const store = useInputDataStore();

const { isDegreesEnabled, isRadiansEnabled } = storeToRefs(store);

</script>

<template>
    <!-- ID given for testing purposes -->
    <div id="unit-circle-mode-container" class="flex">
        <UnitCircleModeButton :is-button-enabled="isDegreesEnabled" text-to-display="Degrees" />
        <UnitCircleModeButton :is-button-enabled="isRadiansEnabled" text-to-display="Radians" />
    </div>
</template>

