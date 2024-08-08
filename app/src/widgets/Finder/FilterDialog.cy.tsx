/// <reference types="cypress" />

import { Provider } from 'jotai';
import FilterDialog from './FilterDialog';
import FinderButton from './FinderButton';
import { FinderContextProvider } from './provider';

const TestComponent = () => {
  const setEntity = cy.spy().as('setEntity');
  return (
    <Provider>
      <FinderButton />
      <FinderContextProvider setEntity={setEntity}>
        <FilterDialog />
      </FinderContextProvider>
    </Provider>
  );
};

describe('<FilterDialog />', () => {
  beforeEach(() => {
    cy.mount(<TestComponent />);
    cy.findByRole('button', {name: 'Search'}).click();
  });

  it('should not list all entities when there is no filter', () => {
    cy.findByRole('combobox').should('not.have.value');
    cy.findByRole('listbox', {name: 'Suggestions'}).should('contain.text', 'No results found.');
  });

  it('should filter by name', () => {
    cy.findByRole('combobox').should('not.have.value').type('flint');
    cy.findByRole('listbox', {name: 'Suggestions'})
      .findAllByRole('option')
      .each(($opt) => {
        expect($opt.text()).to.match(/flint/i);
      });
  });

  it('should filter by category', () => {
    cy.findByText('select a category', {exact: false})
      .next()
      .findByRole('button', {name: 'Weapon'})
      .click();

    cy.findByRole('listbox', {name: 'Suggestions'})
      .findAllByRole('option')
      .should('have.length.gt', 0);
  });

  it('should have sub-category', () => {
    cy.findByText('select a category', {exact: false})
      .next()
      .within(() => {
        cy.findByRole('button', {name: 'Weapon'}).click();
        cy.findByRole('button', {name: 'Axe'}).click();
      })
      .should('not.exist');

    cy.findByRole('listbox', {name: 'Suggestions'})
      .findByRole('option', {name: /^flint knife$/i})
      .should('not.exist');
    cy.findByRole('listbox', {name: 'Suggestions'})
      .findByRole('option', {name: /^flint axe$/i})
      .should('exist')
      .click();
    cy.get('@setEntity').should('have.been.calledOnceWith', 'FlintAxe');
  });

  it('should remove category filter', () => {
    cy.findByRole('combobox').should('not.have.value').type('workbench');
    cy.findByRole('listbox', {name: 'Suggestions'}).as('suggestions')
      .findByRole('option', {name: /^workbench$/i})
      .should('exist')
      .click();


    cy.findByRole('button', {name: 'Search'}).click();

    cy.findByText('select a category', {exact: false})
      .next()
      .findByRole('button', {name: 'Weapon'})
      .click();
    cy.findByRole('listbox', {name: 'Suggestions'}).should('contain.text', 'No results found.');

    cy.findByRole('button', {name: /remove filter weapon/i}).click();

    cy.get('@suggestions')
      .findByRole('option', {name: /^workbench$/i})
      .should('exist');
  });

  it('should keep input and filter after close and re-open', () => {
    cy.findByRole('combobox').should('not.have.value').type('flint');

    cy.findByText('select a category', {exact: false})
      .next()
      .findByRole('button', {name: 'Weapon'})
      .click();

    cy.findByRole('button', {name: /remove filter weapon/i}).should('exist');
    cy.findByRole('button', {name: 'Close'}).click();

    cy.findByRole('button', {name: 'Search'}).click();
    cy.findByRole('combobox').should('contain.value', 'flint');
    cy.findByRole('button', {name: /remove filter weapon/i}).should('exist');
  });
});
