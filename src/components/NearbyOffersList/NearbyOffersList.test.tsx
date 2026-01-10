import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NearbyOffersList from './NearbyOffersList';
import { makeFakeOfferBase } from '../../utils/test-mocks';

vi.mock('../OfferCard/OfferCard', () => ({
  __esModule: true,
  default: ({ offer }: { offer: any }) => <div data-testid="nearby-offer-card">{offer.title}</div>,
}));

describe('Component: NearbyOffersList', () => {
  it('should render correctly with offers', () => {
    const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
    render(
      <MemoryRouter>
        <NearbyOffersList offers={offers} />
      </MemoryRouter>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getAllByTestId('nearby-offer-card')).toHaveLength(2);
  });

  it('should render correctly with empty offers', () => {
    render(
      <MemoryRouter>
        <NearbyOffersList offers={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.queryAllByTestId('nearby-offer-card')).toHaveLength(0);
  });

  it('should render all nearby offers', () => {
    const offers = [
      makeFakeOfferBase(),
      makeFakeOfferBase(),
      makeFakeOfferBase(),
    ];
    render(
      <MemoryRouter>
        <NearbyOffersList offers={offers} />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('nearby-offer-card')).toHaveLength(3);
  });
});
