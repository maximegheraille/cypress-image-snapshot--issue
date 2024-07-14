export interface GetElementProps {
	element: string | JQuery<HTMLElement>;
}

Cypress.Commands.add('getElement', (element) => {
	return typeof element === 'string' ? cy.get(element) : cy.wrap(element);
});
