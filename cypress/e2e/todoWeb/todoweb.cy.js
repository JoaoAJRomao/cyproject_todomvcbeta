/// <reference types="cypress"/>

describe('Example to-do app', () => {
    beforeEach(() => {
        cy.visit('https://todomvc.com/examples/react/dist/#/')
    })

    it('Display a text by default', () => {
        cy.get('[data-testid="text-input"]').should('have.attr', 'placeholder', 'What needs to be done?')
    })

    it('Can add a new todo item', () => {
        cy.get('[data-testid="text-input"]').type('Wash the dishes{enter}')
        cy.get('.todo-list li')
            .should('have.length', 1)
            .last()
            .should('have.text', 'Wash the dishes')
    })
    it('Can add more than one todo', () => {
        cy.get('[data-testid="text-input"]').type('First todo{enter}')
        cy.get('[data-testid="text-input"]').type('Second todo{enter}')
        cy.get('.todo-list li')
            .should('have.length', 2)
            .first()
            .should('have.text', 'First todo')
        cy.get('.todo-list li')
            .last()
            .should('have.text', 'Second todo')

    })
    it('Can checkoff an item as completed', () => {
        cy.get('[data-testid="text-input"]').type('First todo{enter}')
        cy.get('[data-testid="text-input"]').type('Second todo{enter}')
        cy.get('[data-testid="todo-item-button"]').first().click({ force: true })
        cy.get('.todo-list li')
            .should('have.length', 1)
            .first()
            .should('have.text', 'Second todo')
        cy.get('[data-testid="todo-item-button"]').first().click({ force: true })
        cy.get('.todo-list li')
            .should('have.length', 0)
    })

    context('with a checked task', () => {
        beforeEach(() => {
            cy.get('[data-testid="text-input"]').type('First todo{enter}')
            cy.get('[data-testid="text-input"]').type('Second todo{enter}')
        })
        it('Can filter for uncompeted tasks', () => {
            cy.get('[data-testid="todo-item-button"]').first().click({ force: true })
            cy.get('[href="#/active"]').click()
            cy.get('.todo-count').should('have.text','1 item left!')
        })
    })
})