import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesContainer from './FavoritesContainer';
import { makeFakeOfferBase } from '../../utils/test-mocks';
import { CityNames } from '../../const';

vi.mock('../FavoritesCitySection/FavoritesCitySection', () => ({
  __esModule: true,
  default: ({ offersByCityItem }: { offersByCityItem: any }) => (
    <div data-testid="favorites-city-section">
      <span>{offersByCityItem.city}</span>
      <span>{offersByCityItem.offers.length} offers</span>
    </div>
  ),
}));

describe('Component: FavoritesContainer', () => {
  it('should render correctly with offers grouped by city', () => {
    const offersByCityItems = [
      {
        city: CityNames.Paris,
        offers: [makeFakeOfferBase(), makeFakeOfferBase()],
      },
      {
        city: CityNames.Cologne,
        offers: [makeFakeOfferBase()],
      },
    ];

    render(
      <MemoryRouter>
        <FavoritesContainer offersByCityItems={offersByCityItems} />
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getAllByTestId('favorites-city-section')).toHaveLength(2);
  });

  it('should render correctly with empty list', () => {
    render(
      <MemoryRouter>
        <FavoritesContainer offersByCityItems={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.queryAllByTestId('favorites-city-section')).toHaveLength(0);
  });
});
