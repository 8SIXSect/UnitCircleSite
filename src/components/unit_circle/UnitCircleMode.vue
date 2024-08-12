<script setup lang="ts">
import type { AngleMode } from '@/shared_types';
import { useInputDataStore } from '@/stores/inputData';
import { computed } from '@vue/reactivity';
import { storeToRefs } from 'pinia';
import type { ComputedRef } from 'vue';


const store = useInputDataStore();

const { currentAngleMode } = storeToRefs(store);

/**
    * Purpose: take in an `AngleMode` and return a computed boolean;
    * If true, then the given `mode` is enabled
*/
const isEnabled = (mode: AngleMode): ComputedRef<boolean> => {
    return computed(() => currentAngleMode.value === mode)
};

const isEnabledForDegrees = isEnabled("degrees");
const isEnabledForRadians = isEnabled("radians");


</script>

<template>
    <div>
        <button v-if="isEnabledForDegrees" disabled>Degrees</button>
        <button v-else @click="store.switchAngleMode">Deg</button>

        <button v-if="isEnabledForRadians" disabled>Radians</button>
        <button v-else @click="store.switchAngleMode">Rad</button>
    </div>
</template>
