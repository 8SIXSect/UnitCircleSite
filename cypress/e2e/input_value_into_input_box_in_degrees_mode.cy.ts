import { getInputBoxWithAngleNinetyDegrees, getCheckNumbersButton } from "../support/commands"


describe("Inputting values into one input box on the unit circle (degrees mode)", () => {
    beforeEach(() => {
        cy.visit("/")

        // Check that the site is in degree mode
        cy.get("#unit-circle-mode-container")
            .should("exist")
            .find("button")
            .first()  // The first of the two buttons is degrees
            .should("be.disabled")  // whichever is disabled is the mode we are in
    })


    it("input invalid data into entry box", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("you can't type non-digits in here while in degrees mode")
            .should("have.value", "")
    })


    it("input valid number entry box but it will be incorrect angle", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("123")
            .should("have.value", "123")

        getCheckNumbersButton()
            .click()

        getInputBoxWithAngleNinetyDegrees()
            .should("not.be.disabled")
    })


    it("input valid number entry box with the correct angle", () => {
        getInputBoxWithAngleNinetyDegrees()
            .type("90")
            .should("have.value", "90")

        getCheckNumbersButton()
            .click()

        getInputBoxWithAngleNinetyDegrees()
            .should("be.disabled")
    })
})
