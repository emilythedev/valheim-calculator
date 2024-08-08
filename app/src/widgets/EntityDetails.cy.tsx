import { Provider } from 'jotai';
import EntityDetails from './EntityDetails';

describe('<EntityDetails />', () => {
  it('should show nothing when there is no entity ID', () => {
    cy.mount(<Provider><EntityDetails entity="" /></Provider>);
    cy.get('[data-cy-root]').should('be.empty');
  });

  it('should display entity name and quality levels', () => {
    cy.mount(
      <Provider>
        <EntityDetails entity='StaffOfEmbers' />
      </Provider>
    );
    cy.findByRole('heading', {name: /staff of embers/i}).should('be.visible');
    cy.findByText('Quality', {exact: true})
      .next()
      .findAllByRole('listitem')
      .then(($items) => {
        expect($items.length).to.eq(4);
      })
      .each(($item, i) => {
        cy.findByText('Quality level', {container: $item})
          .next()
          .invoke('text')
          .should('eq', `${i + 1}`);

        cy.findByRole('textbox', {container: $item})
          .should('not.exist');

        cy.findByRole('button', {name: /add/i, container: $item})
          .click();

        cy.findByRole('textbox', {container: $item})
          .should('be.visible')
          .should('have.value', 1);
      });
  });

  it('should display crafting station with extensions', () => {
    cy.mount(
      <Provider>
        <EntityDetails entity='Forge' />
      </Provider>
    );
    cy.findByRole('heading', {name: /forge/i}).should('be.visible');
    cy.findByText('Base Building', {exact: true})
      .next()
      .findAllByRole('listitem')
      .should('have.length', 1);

    cy.findByText('Extensions')
      .next()
      .findAllByRole('listitem')
      .should('have.length', 6)
      .filter(':contains("Anvils")')
      .within(() => {
        cy.findByRole('textbox')
          .should('not.exist');

        cy.findByRole('button', {name: /add/i})
          .click();

        cy.findByRole('textbox')
          .should('be.visible')
          .should('have.value', 1);
      });
  });

  it('should trigger onClear', () => {
    const onClearSpy = cy.spy().as('onClearSpy');
    cy.mount(
      <Provider>
        <EntityDetails entity='Forge' onClear={onClearSpy} />
      </Provider>
    );

    cy.findByRole('button', {name: /clear/i})
      .click();

    cy.get('@onClearSpy').should('be.calledOnce');
  });
});
