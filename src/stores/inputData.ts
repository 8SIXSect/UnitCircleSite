import { defineStore } from "pinia";

interface State {
    currentlyFocusedInput: number
}


export const useInputDataStore = defineStore("inputData", {
    state: (): State => {
        return {
            currentlyFocusedInput: -1
        }
    },
    actions: {
        /**
            * test doc string
            *
        */
        focusInput(inputId: number) {
            this.currentlyFocusedInput = inputId
        }
    }
})

