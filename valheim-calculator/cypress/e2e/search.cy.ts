/// <reference types="cypress" />

describe('Search', () => {
  it('search for an item', () => {
    cy.visit('/');

    cy.get('[data-testid=cy-select-queryType').click();
    cy.get('[data-testid=cy-option-titleType').click();

    cy.get('input[name=queryInputValue]').type('workbench');
    cy.get('button[type=submit]').click();

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr > td:first-child')
      .should('have.text', 'Workbench');
  });
});
