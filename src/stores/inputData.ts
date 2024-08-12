import type { AngleMode } from "@/shared_types";
import { defineStore } from "pinia";


type FixedSizeArray<N extends number, T> = {
    length: N
} & {
    [index: number]: T
}


interface State {
    currentlyFocusedInput: number
    userInputValues: FixedSizeArray<16, string>,
    correctInputIds: number[],
    currentAngleMode: AngleMode
}


export const useInputDataStore = defineStore("inputData", {
    state: (): State => {
        return {
            currentlyFocusedInput: -1,

            // 16 input boxes so each value is an input box
            userInputValues: <FixedSizeArray<16, string>>Array
                .from({ length: 16 })
                .map(() => ""),

            correctInputIds: [],

            currentAngleMode: "degrees"
        }
    },
    actions: {
        /**
            * Purpose of this action is to change the currently focused input id
            * to the given `inputId`
        */
        focusInput(inputId: number) {
            this.currentlyFocusedInput = inputId
        },

        /**
            * The purpose of this action is to change the current angle mode to
            * its opposite.
            * So if the current mode is radians, then degrees will be set
            * Additionally, the state of this store will be reset before changing
            * the current angle mode
        */
        switchAngleMode() {
            const angleModeToSwitchTo: AngleMode = (
                this.currentAngleMode === "degrees" ? "radians" : "degrees"
            );

            this.$reset();

            this.currentAngleMode = angleModeToSwitchTo;
        }

    },
    getters: {
        isDegreesEnabled: (state: State) => state.currentAngleMode === 'degrees',
        isRadiansEnabled: (state: State) => state.currentAngleMode === 'radians'
    }
})

