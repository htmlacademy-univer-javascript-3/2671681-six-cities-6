import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesCitySection from './FavoritesCitySection';
import { makeFakeOfferBase } from '../../utils/test-mocks';
import { CityNames } from '../../const';

vi.mock('../FavoriteOfferCard/FavoriteOfferCard', () => ({
  __esModule: true,
  default: ({ offer }: { offer: any }) => <div data-testid="favorite-offer-card">{offer.title}</div>,
}));

describe('Component: FavoritesCitySection', () => {
  it('should render correctly with city name and offers', () => {
    const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
    const offersByCityItem = {
      city: CityNames.Paris,
      offers,
    };

    render(
      <MemoryRouter>
        <FavoritesCitySection offersByCityItem={offersByCityItem} />
      </MemoryRouter>
    );

    expect(screen.getByText(CityNames.Paris)).toBeInTheDocument();
    expect(screen.getAllByTestId('favorite-offer-card')).toHaveLength(2);
  });

  it('should render all offers for the city', () => {
    const offers = [
      makeFakeOfferBase(),
      makeFakeOfferBase(),
      makeFakeOfferBase(),
    ];
    const offersByCityItem = {
      city: CityNames.Amsterdam,
      offers,
    };

    render(
      <MemoryRouter>
        <FavoritesCitySection offersByCityItem={offersByCityItem} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('favorite-offer-card')).toHaveLength(3);
  });
});
