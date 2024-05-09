/// <reference types="cypress" />

describe('Wishlist', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/data.json').as('jsonData');
    cy.wait('@jsonData');
  });

  // it('is empty', () => {});

  it('display added recipes', () => {
    cy.search('"Bronze pickaxe"');

    // Add all recipes searched
    cy.get('table[data-testid=cy-table-recipes] > tbody > tr > td:first-child')
      .as('titleCells')
      .parent()
      .find('td > button[data-testid="cy-btn-addItem"]')
      .each(($btn) => {
        cy.wrap($btn).click();
      });

    // Check wishlist
    cy.get('[data-textid="cy-wishlist"] li > div:first-child')
      .then(($listItem) => {
        cy.get('@titleCells')
          .then(($tds) => {
            const s = new Set<string>();

            $tds.each((i, td) => {
              s.add(Cypress.$(td).text());
            })

            expect(s.size).eq($tds.length); // no duplicates
            expect($listItem.length).eq($tds.length);

            $listItem.each((i, titleDiv) => {
              s.delete(Cypress.$(titleDiv).text());

              cy.wrap(titleDiv)
                .find('[data-testid="cy-stepper"] input')
                .should('have.value', 1);
            });

            expect(s.size).eq(0);
          });
      });
  });

  it('add recipe count', () => {
    cy.search('"Wood arrow"');

    // Add item
    cy.get('table[data-testid=cy-table-recipes] > tbody > tr:first-child')
      .find('button[data-testid="cy-btn-addItem"]')
      .click();

    // Confirm count before adding more
    cy.get('[data-textid="cy-wishlist"] li [data-testid="cy-stepper"]')
      .as('stepper')
      .find('input')
      .should('have.value', 1);

    // Add one more from wishlist
    cy.get('@stepper')
      .find('button[data-testid="cy-stepper-inc"]')
      .first()
      .click();

    cy.get('@stepper')
      .find('input')
      .should('have.value', 2);
  });

  it('remove recipe', () => {
    cy.search('"Wood arrow"');

    cy.get('table[data-testid=cy-table-recipes] > tbody > tr:first-child')
      .find('button[data-testid="cy-btn-addItem"]')
      .click();

    cy.get('[data-textid="cy-wishlist"] li [data-testid="cy-stepper"]')
      .as('stepper')
      .find('input')
      .should('have.value', 1);

    cy.get('@stepper')
      .find('button[data-testid="cy-stepper-dec"]')
      .first()
      .click();

    cy.get('[data-textid="cy-wishlist"] li')
      .should('not.exist');
  });

  it('search item by clicking item link', () => {
    cy.search('"Bread"');

    // Add one to wishlist
    cy.get('table[data-testid=cy-table-recipes] > tbody')
      .contains('tr', 'Bread')
      .find('[data-testid="cy-btn-addItem"]')
      .click();

    // Click the link inside wishlist and confirm search result
    cy.get('[data-textid="cy-wishlist"] li')
      .contains('div:first-child', 'Bread')
      .parent()
      .find('> ul > li a') // material list
      .each(($link) => {
        cy.wrap($link)
          .click()
          .invoke('text')
          .then((linkTitle) => {
            cy.get('table[data-testid="cy-table-recipes"] > tbody > tr > td:first-child')
              .invoke('text')
              .should('match', new RegExp(`^${linkTitle}( x )?`));
          });
      });
  });
});
