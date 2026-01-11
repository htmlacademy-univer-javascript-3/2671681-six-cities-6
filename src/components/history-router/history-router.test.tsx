import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-router';

describe('Component: HistoryRouter', () => {
  it('should render children correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <div data-testid="test-child">Test Content</div>
      </HistoryRouter>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should use provided history location', () => {
    const history = createMemoryHistory();
    history.push('/test-route');

    render(
      <HistoryRouter history={history}>
        <div>Child Content</div>
      </HistoryRouter>
    );

    expect(history.location.pathname).toBe('/test-route');
  });
});
