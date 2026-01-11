import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
  });

  it('should have correct classes', () => {
    render(<FavoritesEmpty />);

    const mainElement = screen.getByText('Nothing yet saved.').closest('main');
    expect(mainElement).toHaveClass('page__main--favorites-empty');
  });

  it('should have visually hidden heading', () => {
    render(<FavoritesEmpty />);

    const heading = screen.getByText(/Favorites \(empty\)/i);
    expect(heading).toHaveClass('visually-hidden');
  });
});
