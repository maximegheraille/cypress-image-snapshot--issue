import 'cypress-mochawesome-reporter/register';
import 'cypress-real-events/support';
import 'cypress-axe';

import addContext from 'mochawesome/addContext';

Cypress.on('uncaught:exception', () => {
  return false;
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed' && test.title.includes('snapshot')) {
    let parentTitle =
      runnable.parent.parent && runnable.parent.parent.title != ''
        ? runnable.parent.parent.title + ` -- ${runnable.parent.title}`
        : runnable.parent.title;
    parentTitle = parentTitle.replace(/:/g, '');
    const screenshot = `snapshots/${Cypress.spec.name}/__diff_output__/${parentTitle} -- ${test.title}.diff.png`;

    addContext({ test }, screenshot);
  }
});

import './commands';
import { GetElementProps } from './commands/getElement';
import { ViewPortsProps } from './commands/setViewport';
import { TakeSnapshotProps } from './commands/takeSnapshot';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setViewport(viewport: ViewPortsProps): Chainable<JQuery<HTMLElement>>;
      getElement(
        element: GetElementProps['element']
      ): Chainable<JQuery<HTMLElement>>;
      takeSnapshot(props: TakeSnapshotProps): Chainable<JQuery<HTMLElement>>;
    }
  }
}
