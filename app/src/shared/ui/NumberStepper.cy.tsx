/// <reference types="cypress" />

import NumberStepper from './NumberStepper';

describe('<NumberStepper />', () => {
  it('renders with value', () => {
    cy.mount(<NumberStepper value={10} />);
    cy.get('[data-testid="stepper"]').should('have.value', 10);
  });

  it('triggers onChange on every increment click', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={0} onChange={onChangeSpy} />);
    cy.get('[data-testid="stepper"]').should('have.value', 0);

    cy.get('[data-testid="stepper-inc"]').click();
    cy.get('@onChangeSpy').should('have.been.calledWith', 1);

    cy.get('[data-testid="stepper-inc"]').click();
    cy.get('@onChangeSpy').should('have.been.calledTwice');
  });

  it('triggers onChange on every decrement click', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={10} onChange={onChangeSpy} />);
    cy.get('[data-testid="stepper"]').should('have.value', 10);

    cy.get('[data-testid="stepper-dec"]').click();
    cy.get('@onChangeSpy').should('have.been.calledWith', 9);

    cy.get('[data-testid="stepper-dec"]').click();
    cy.get('@onChangeSpy').should('have.been.calledTwice');
  });

  it('triggers onChange on input update', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={0} onChange={onChangeSpy} />);
    cy.get('[data-testid="stepper"]').should('have.value', 0);

    cy.get('[data-testid="stepper"]').type('{selectall}5');
    cy.get('@onChangeSpy').should('have.been.calledOnceWith', 5);
  });

  it('update displayed value on value prop updated', () => {
    cy.mount(<NumberStepper value={10} />).then(({ rerender }) => {
      cy.get('[data-testid="stepper"]').should('have.value', 10);
      rerender(<NumberStepper value={0} />);
      cy.get('[data-testid="stepper"]').should('have.value', 0);
    });
  });
});
