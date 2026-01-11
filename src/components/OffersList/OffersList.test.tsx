import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OffersList from './OffersList';
import { CityNames } from '../../const';
import { makeFakeOfferBase } from '../../utils/test-mocks';
import { SortType } from '../SortOptions/sort-constants';
import { OfferBase } from '../../types/offers';

vi.mock('../OfferCard/OfferCard', () => ({
  __esModule: true,
  default: ({ offer }: { offer: OfferBase }) => <div data-testid="offer-card">{offer.title}</div>,
}));

vi.mock('../SortOptions/SortOptions', () => ({
  __esModule: true,
  default: ({ activeSort, onSortChange }: { activeSort: SortType; onSortChange: (sort: SortType) => void }) => (
    <div data-testid="sort-options">
      <button onClick={() => onSortChange(SortType.PriceLowToHigh)}>Change Sort</button>
      <span>{activeSort}</span>
    </div>
  ),
}));

describe('Component: OffersList', () => {
  const setActive = vi.fn();
  const activeCity = CityNames.Paris;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with offers', () => {
    const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
    render(<OffersList offers={offers} setActive={setActive} activeCity={activeCity} />);

    expect(screen.getByText(`${offers.length} places to stay in ${activeCity}`)).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-card')).toHaveLength(2);
  });

  it('should render correctly with empty offers', () => {
    render(<OffersList offers={[]} setActive={setActive} activeCity={activeCity} />);

    expect(screen.getByText(`0 places to stay in ${activeCity}`)).toBeInTheDocument();
    expect(screen.queryAllByTestId('offer-card')).toHaveLength(0);
  });

  it('should sort offers by price low to high', () => {
    const offer1 = { ...makeFakeOfferBase(), id: '1', price: 100 };
    const offer2 = { ...makeFakeOfferBase(), id: '2', price: 50 };
    const offer3 = { ...makeFakeOfferBase(), id: '3', price: 150 };

    render(<OffersList offers={[offer1, offer2, offer3]} setActive={setActive} activeCity={activeCity} />);

    const sortButton = screen.getByText('Change Sort');
    fireEvent.click(sortButton);

    const cards = screen.getAllByTestId('offer-card');
    expect(cards[0]).toHaveTextContent(offer2.title);
    expect(cards[1]).toHaveTextContent(offer1.title);
    expect(cards[2]).toHaveTextContent(offer3.title);
  });

  it('should render sort options', () => {
    const offers = [makeFakeOfferBase()];
    render(<OffersList offers={offers} setActive={setActive} activeCity={activeCity} />);

    expect(screen.getByTestId('sort-options')).toBeInTheDocument();
  });
});
