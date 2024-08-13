import { getInputBoxWithAngleNinetyDegrees, getCheckNumbersButton } from "../support/commands"


describe("Inputting values into one input box on the unit circle (radians mode)", () => {
    beforeEach(() => {
        cy.visit("/")

        // Check that the site is in degree mode
        cy.get("#unit-circle-mode-container")
            .should("exist")
            .find("button")
            .last()  // Only two buttons; the second of the two buttons is radians
            .as("btn")
            .click()  // default mode is degrees so clicking the rad. button will enable radians mode
            
        cy.get("@btn").should("be.disabled")  // whichever is disabled is the mode we are in

    })


    it("input invalid data into entry box", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("only slashes, digits, and the pi symbol are allowed")
            .should("have.value", "")
    })


    it("input valid number entry box but it will be incorrect angle", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("1/1")
            .should("have.value", "1/1")

        getCheckNumbersButton()
            .click()

        getInputBoxWithAngleNinetyDegrees()
            .should("not.be.disabled")
    })


    it("input valid number entry box with the correct angle", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("π/2")
            .should("have.value", "π/2")

        getCheckNumbersButton()
            .click()

        getInputBoxWithAngleNinetyDegrees()
            .should("be.disabled")
    })
})
