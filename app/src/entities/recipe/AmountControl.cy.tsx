import { Provider } from 'jotai';
import AmountControl from './AmountControl';
import { EntityRecipeContextProvider, useRecipeContext } from './provider';

const TestAmount = () => {
  const { amount } = useRecipeContext();
  return (
    <span data-testid="amount">{amount}</span>
  )
};

const TestComponent = ({ entity, quality }: EntityQualityProps) => {
  return (
    <Provider>
      <EntityRecipeContextProvider entity={entity} quality={quality}>
        <TestAmount />
        <AmountControl />
      </EntityRecipeContextProvider>
    </Provider>
  );
};

const clickAddBtn = () => {
  cy.findByRole('button', {name: /add/i})
    .should('be.visible')
    .click();
};

const assertValue = (value: number) => {
  return cy.get('[data-testid="amount"]').should('have.text', value);
};

const assertInputValue = (value: number) => {
  if (value > 0) {
    return cy.findByLabelText('Amount').should('have.value', value);
  }
  return cy.findByLabelText('Amount').should('not.exist');
};

describe('<AmountControl />', () => {
  beforeEach(() => {
    cy.mount(<TestComponent entity='Forge' quality={1} />);

    assertValue(0);
  });

  it('should show add button only if amount = 0', () => {
    cy.get('input').should('not.exist');
    cy.findAllByRole('button').should('have.length', 1);
    cy.findByRole('button', {name: /add/i})
      .should('be.visible');
  });

  it('should show stepper input when amount > 0', () => {
    clickAddBtn();

    assertValue(1);
    assertInputValue(1);

    cy.findAllByRole('button', {name: /increase|decrease/i})
      .should('have.length', 2);
  });

  it('should update input value', () => {
    clickAddBtn();

    assertValue(1);
    assertInputValue(1).type('{selectAll}99');

    assertValue(99);
  });

  it('should add value', () => {
    clickAddBtn();

    assertValue(1);

    cy.findByRole('button', {name: /increase/i}).click();
    assertValue(2);
    assertInputValue(2);

    cy.findByRole('button', {name: /increase/i}).click();
    assertValue(3);
    assertInputValue(3);
  });

  it('should deduct value', () => {
    clickAddBtn();

    cy.findByLabelText('Amount').type('{selectAll}99');
    assertValue(99);

    cy.findByRole('button', {name: /decrease/i}).click();
    assertValue(98);
    assertInputValue(98);

    cy.findByRole('button', {name: /decrease/i}).click();
    assertValue(97);
    assertInputValue(97);
  });

  it('should hide input if amount becomes 0', () => {
    clickAddBtn();

    assertValue(1);
    assertInputValue(1);

    cy.findByRole('button', {name: /decrease/i}).click();
    assertValue(0);
    assertInputValue(0);
  });
});
