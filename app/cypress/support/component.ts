import '@/app/globals.css';

import { mount } from 'cypress/react18';
import './commands';

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
