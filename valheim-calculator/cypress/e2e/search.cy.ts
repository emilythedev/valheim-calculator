/// <reference types="cypress" />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/data.json').as('jsonData');
    cy.wait('@jsonData');
  });

  it('search for an item by full name', () => {
    cy.search('"forge"');

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr')
      .should('have.length', 1)
      .find('> td:first-child')
      .should('have.text', 'Forge');
  });

  it('search for all items containing search text', () => {
    cy.search('forge');

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr > td:first-child')
      .should('include.text', 'forge');
  });
});
