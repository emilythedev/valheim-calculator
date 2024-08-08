/// <reference types="cypress" />

import NumberStepper from './NumberStepper';

describe('<NumberStepper />', () => {
  it('should render with value', () => {
    cy.mount(<NumberStepper value={10} />);
    cy.get('input').should('have.value', 10);
  });

  it('should trigger onValueChange on every increment click', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={0} onValueChange={onChangeSpy} />);
    cy.get('input').should('have.value', 0);

    cy.findByRole('button', {name: /increase/i}).click();
    cy.get('@onChangeSpy').should('have.been.calledWith', 1);

    cy.findByRole('button', {name: /increase/i}).click();
    cy.get('@onChangeSpy').should('have.been.calledTwice');
  });

  it('should trigger onValueChange on every decrement click', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={10} onValueChange={onChangeSpy} />);
    cy.get('input').should('have.value', 10);

    cy.findByRole('button', {name: /decrease/i}).click();
    cy.get('@onChangeSpy').should('have.been.calledWith', 9);

    cy.findByRole('button', {name: /decrease/i}).click();
    cy.get('@onChangeSpy').should('have.been.calledTwice');
  });

  it('should trigger onChange on input update', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy');
    cy.mount(<NumberStepper value={0} onValueChange={onChangeSpy} />);
    cy.get('input').should('have.value', 0);

    cy.get('input').type('{selectall}5');
    cy.get('@onChangeSpy').should('have.been.calledOnceWith', 5);
  });

  it('should update displayed value on value prop updated', () => {
    cy.mount(<NumberStepper value={10} />).then(({ rerender }) => {
      cy.get('input').should('have.value', 10);
      rerender(<NumberStepper value={0} />);
      cy.get('input').should('have.value', 0);
    });
  });
});
