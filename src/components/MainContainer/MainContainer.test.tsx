import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MainContainer from './MainContainer';
import { makeFakeOfferBase, makeFakeCity } from '../../utils/test-mocks';
import { OfferBase } from '../../types/offers';

vi.mock('../Map/Map', () => ({
  __esModule: true,
  default: () => <div data-testid="map">Map</div>,
}));

vi.mock('../OffersList/OffersList', () => ({
  __esModule: true,
  default: ({ offers, activeCity }: { offers: OfferBase[]; activeCity: string }) => (
    <div data-testid="offers-list">
      <span>{offers.length} offers in {activeCity}</span>
    </div>
  ),
}));

describe('Component: MainContainer', () => {
  it('should render correctly with offers', () => {
    const city = makeFakeCity();
    const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
    const setActive = () => {};

    const { container } = render(
      <MainContainer
        cityOffers={offers}
        city={city}
        activeOffer={undefined}
        setActive={setActive}
      />
    );

    expect(container.querySelector('[data-testid="offers-list"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="map"]')).toBeInTheDocument();
  });

  it('should render correctly with empty offers', () => {
    const city = makeFakeCity();
    const setActive = () => {};

    const { container } = render(
      <MainContainer
        cityOffers={[]}
        city={city}
        activeOffer={undefined}
        setActive={setActive}
      />
    );

    expect(container.querySelector('[data-testid="offers-list"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="map"]')).toBeInTheDocument();
  });
});
