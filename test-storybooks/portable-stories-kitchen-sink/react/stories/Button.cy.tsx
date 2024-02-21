/// <reference types="cypress" />
import * as stories from './Button.stories';
import { composeStories } from '@storybook/react';

const { CSF3Primary, WithLoader, CSF3InputFieldFilled, Modal } = composeStories(stories)

describe('<Button />', () => {
  it('renders with loaders and play function', () => {
    cy.then(async() => {
      await WithLoader.load();
    });

    cy.mount(<WithLoader />);

    cy.then(async() => {
      await WithLoader.play!({ canvasElement: document.querySelector('[data-cy-root]') as HTMLElement });
      cy.get('[data-testid="loaded-data"]').should('contain.text', 'bar');
      cy.get('[data-testid="mock-data"]').should('contain.text', 'mockFn return value');
    });
  })

  it('renders primary button', async () => {
    cy.mount(<CSF3Primary />)
    cy.get('[data-decorator]').should('exist');
  })

  it('renders primary button with custom args', async () => {
    cy.mount(<CSF3Primary>bar</CSF3Primary>)
    cy.get('button').should('contain.text', 'bar');
  })

  it('renders with play function', () => {
    cy.mount(<CSF3InputFieldFilled />);

    cy.then(async() => {
      await CSF3InputFieldFilled.play!({ canvasElement: document.querySelector('[data-cy-root]') as HTMLElement });
      cy.get('[data-testid="input"]').should('contain.value', 'Hello world!');
    });
  })

  it('renders modal story', () => {
    cy.mount(<Modal />);

    cy.then(async() => {
      await Modal.play!({ canvasElement: document.querySelector('[data-cy-root]') as HTMLElement });
      cy.get('[role="dialog"]').should('exist');
    });
  })
})
