/// <reference types="cypress" />

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should get a summary of materials needed from desired crafting items', () => {
    cy.findByRole('button', {name: 'Search'}).click();
    cy.findByRole('dialog').within(() => {
      cy.findByRole('combobox').type('Staff');
      cy.findByRole('listbox', {name: 'Suggestions'})
        .findByRole('option', {name: 'Staff of Embers'}).click();
    });

    cy.get('#EntityDetails').within(() => {
      cy.findByRole('heading', {name: 'Staff of Embers'}).should('exist');
      cy.findByText('Quality')
        .next()
        .findAllByRole('listitem')
        .should('have.length', 4)
        .filter(':contains("2")')
        .findByRole('button', {name: /add/i})
        .click();
    });

    cy.get('#Shelf').within(() => {
      cy.findByRole('heading', {name: /shelf/i}).should('exist')
      cy.findByRole('list')
        .findAllByRole('listitem')
        .should('have.length', 1)
        .first()
        .should('contain.text', 'Staff of Embers');
    });

    cy.get('#Summary').within(() => {
      cy.findByRole('heading', {name: 'Materials'})
        .next()
        .findAllByRole('listitem')
        .as('materials')
        .invoke('text')
        .should('eq', '8Refined eitr2Surtling core10Yggdrasil wood');
    });
  });
});
