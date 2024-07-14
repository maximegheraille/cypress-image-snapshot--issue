import { viewPorts } from 'cypress/support/commands/setViewport';
describe(`${
  Cypress.browser.displayName
} - test`, () => {
  before(() => {
    cy.visit('https://basic-site-theta.vercel.app/');
  });
  describe.only('already taken snapshot', () => {
    ['1','2','3','4','5','6','7','8','9','10','11'].forEach((id) => {
      viewPorts.forEach((viewport) => {
        it(`should match on ${viewport} with ${id}`, () => {
          cy.takeSnapshot({
            viewport: viewport,
            element: `#${id}`,
          });
        });
      });
    });
  });
});
