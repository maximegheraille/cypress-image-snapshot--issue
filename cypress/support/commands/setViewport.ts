export const viewPorts = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const;
export type ViewPortsProps = (typeof viewPorts)[number];
Cypress.Commands.add('setViewport', (viewport) => {
	if (viewport === 'xs') {
		cy.viewport('iphone-3');
	} else if (viewport === 'sm') {
		cy.viewport(577, 812);
	} else if (viewport === 'md') {
		cy.viewport(769, 1025);
	} else if (viewport === 'lg') {
		cy.viewport(993, 1080);
	} else if (viewport === 'xl') {
		cy.viewport(1201, 1080);
	} else if (viewport === 'xxl') {
		cy.viewport('ipad-2');
	} else if (viewport === 'xxxl') {
		cy.viewport(1920, 1080);
	}
});
