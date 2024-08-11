import { defineStore } from "pinia";


type FixedSizeArray<N extends number, T> = {
    length: N
} & {
    [index: number]: T
}


interface State {
    currentlyFocusedInput: number
    userInputValues: FixedSizeArray<16, string>,
    correctInputIds: number[]
}


export const useInputDataStore = defineStore("inputData", {
    state: (): State => {
        return {
            currentlyFocusedInput: -1,

            // 16 input boxes so each value is an input box
            userInputValues: <FixedSizeArray<16, string>>Array
                .from({ length: 16 })
                .map(() => ""),

            correctInputIds: []
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

