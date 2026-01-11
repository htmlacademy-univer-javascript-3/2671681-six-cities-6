import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeFakeCity, makeFakeOfferBase } from '../../utils/test-mocks';

vi.mock('../../hooks/use-map', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Component: Map', () => {
  const mockCity = makeFakeCity();
  const mockOffers = [makeFakeOfferBase(), makeFakeOfferBase()];

  it('should render correctly', () => {
    render(
      <Map
        city={mockCity}
        offers={mockOffers}
        variant="cities__map"
        selectedOffer={undefined}
      />
    );

    const mapContainer = screen.getByRole('generic');
    expect(mapContainer).toBeInTheDocument();
  });

  it('should have correct class based on variant', () => {
    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        variant="offer__map"
        selectedOffer={undefined}
      />
    );

    const section = container.querySelector('section');
    expect(section).toHaveClass('offer__map');
    expect(section).toHaveClass('map');
  });

  it('should render with selected offer', () => {
    const selectedOffer = mockOffers[0];

    const { container } = render(
      <Map
        city={mockCity}
        offers={mockOffers}
        variant="cities__map"
        selectedOffer={selectedOffer}
      />
    );

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
