import { getUnitCircleModeButtons } from "../support/commands"

describe("Tries to switch between the radians mode and the degrees mode", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("Start in degrees mode (default) and switch to radians mode", () => {
        getUnitCircleModeButtons()
            .as("buttons")
            .first()
            .should("be.disabled")
        
        cy.get("@buttons")
            .last()  // only two buttons so this will get the second one (which is radians)
            .click()

        // After clicking radians button, program should be in radians mode

        cy.get("@buttons")
            .last()  // rad button
            .should("be.disabled")

        cy.get("@buttons")
            .first()  // deg button
            .should("not.be.disabled")
    })
})
