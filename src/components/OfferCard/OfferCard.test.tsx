import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OfferCard from './OfferCard';
import { makeFakeOfferBase } from '../../utils/test-mocks';
import { AppRoute } from '../../const';

vi.mock('../../hooks/useFavoriteOfferUpdate', () => ({
  useFavoriteOfferUpdate: vi.fn(() => vi.fn()),
}));

vi.mock('../BookmarkButton/BookmarkButton', () => ({
  __esModule: true,
  default: ({ onClick, isActive }: { onClick: () => void; isActive: boolean }) => (
    <button data-testid="bookmark-button" onClick={onClick}>
      {isActive ? 'Active' : 'Inactive'}
    </button>
  ),
}));

describe('Component: OfferCard', () => {
  const offer = makeFakeOfferBase();
  const setActive = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} variant="cities" />
      </MemoryRouter>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', offer.previewImage);
  });

  it('should render premium badge when offer is premium', () => {
    const premiumOffer = { ...offer, isPremium: true };
    render(
      <MemoryRouter>
        <OfferCard offer={premiumOffer} variant="cities" />
      </MemoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium badge when offer is not premium', () => {
    const nonPremiumOffer = { ...offer, isPremium: false };
    render(
      <MemoryRouter>
        <OfferCard offer={nonPremiumOffer} variant="cities" />
      </MemoryRouter>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should call setActive on mouse enter', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} variant="cities" setActive={setActive} />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);

    expect(setActive).toHaveBeenCalledWith(offer.id);
  });

  it('should call setActive with empty string on mouse leave', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} variant="cities" setActive={setActive} />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseLeave(card);

    expect(setActive).toHaveBeenCalledWith('');
  });

  it('should render link to offer page', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} variant="cities" />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href') === AppRoute.Offer(offer.id));
    expect(offerLink).toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    render(
      <MemoryRouter>
        <OfferCard offer={offer} variant="cities" />
      </MemoryRouter>
    );

    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
  });
});
