/// <reference types="cypress" />

Cypress.Commands.add('search', (text) => {
  cy.get('[data-testid=cy-select-queryType').click();
  cy.get('[data-testid=cy-option-titleType').click();

  cy.get('input[name=queryInputValue]').type(text);
  cy.get('button[type=submit]').click();
});
