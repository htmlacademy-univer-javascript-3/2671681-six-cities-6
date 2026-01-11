import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyMainContainer from './empty-main-container';

describe('Component: EmptyMainContainer', () => {
  it('should render correctly', () => {
    render(<EmptyMainContainer />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });

  it('should have correct classes', () => {
    render(<EmptyMainContainer />);

    const container = screen.getByText('No places to stay available').closest('.cities__places-container');
    expect(container).toHaveClass('cities__places-container--empty');
  });
});
