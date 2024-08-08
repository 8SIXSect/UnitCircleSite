<script setup lang="ts">

const emit = defineEmits<{
    checkValue: [expectedValue: number]
}>();


/**
 * Handles the logic for when the check numbers button is clicked
*/
const whenCheckNumbersIsClicked = () => {
    console.log("cc");
    //emit("checkValue", )
}

</script>


<template>
    <div class="flex justify-center items-center">
        <button
            class="border border-solid border-black"
            @click="whenCheckNumbersIsClicked"
            >Check Numbers</button>
    </div>
</template>
