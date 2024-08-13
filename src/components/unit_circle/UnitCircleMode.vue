<script setup lang="ts">
import { useInputDataStore } from '@/stores/inputData';
import { storeToRefs } from 'pinia';


const store = useInputDataStore();

const { isDegreesEnabled, isRadiansEnabled } = storeToRefs(store);

</script>

<template>
    <!-- ID given for testing purposes -->
    <div id="unit-circle-mode-container">
        <button v-if="isDegreesEnabled" disabled>Degrees</button>
        <button v-else @click="store.switchAngleMode">Deg</button>

        <button v-if="isRadiansEnabled" disabled>Radians</button>
        <button v-else @click="store.switchAngleMode">Rad</button>
    </div>
</template>
