import '@/app/globals.css';

import { mount } from 'cypress/react18';
import './commands';

// To fix:
// Jotai atoms with storage does not react to clearAllLocalStorage() before each test.
// (But it works if we clearAllLocalStorage() after each test)
// Clearing the local storage before atoms mounted with previous values,
// and wrapping the component to be tested with <Provider />
// can avoid data persisted between tests.
window.localStorage.clear();

Cypress.Commands.add('mount', mount);
