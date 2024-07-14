import { CypressImageSnapshotOptions } from '@simonsmith/cypress-image-snapshot/types';
import {addMatchImageSnapshotCommand} from '@simonsmith/cypress-image-snapshot/command'
import { ViewPortsProps } from './setViewport';
import { GetElementProps } from './getElement';

export interface TakeSnapshotProps {
  viewport: ViewPortsProps;
  element: GetElementProps['element'];
}

Cypress.Commands.add('takeSnapshot', ({ viewport, element }) => {
  addMatchImageSnapshotCommand();
  cy.setViewport(viewport).then(() => {
    const options: CypressImageSnapshotOptions = {
      failureThreshold: 0.01,
      allowSizeMismatch: true,
      failureThresholdType: 'percent',
      capture: 'viewport',
      comparisonMethod: 'ssim',
      customSnapshotsDir: `./cypress/reports/mochareports/snapshots/${
        Cypress.spec.fileName
      }/${Cypress.browser.name}`,
      e2eSpecDir: Cypress.spec.relative,
      snapFilenameExtension: '.snap',
    };

    cy.getElement(element).scrollIntoView();
    cy.wait(1000);
     typeof element === 'string'
      ? cy.getElement(element).matchImageSnapshot(options)
       : cy.matchImageSnapshot(options);
  });
});
