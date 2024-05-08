/// <reference types="cypress" />

const search = (text: string) => {
  cy.get('[data-testid=cy-select-queryType').click();
  cy.get('[data-testid=cy-option-titleType').click();

  cy.get('input[name=queryInputValue]').type(text);
  cy.get('button[type=submit]').click();
};

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('search for an item by full name', () => {
    search('"workbench"');

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr')
      .should('have.length', 1)
      .find('> td:first-child')
      .should('have.text', 'Workbench');
  });

  it('search for all items containing search text', () => {
    search('eitr');

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr > td:first-child')
      .should('include.text', 'eitr');
  })
});
