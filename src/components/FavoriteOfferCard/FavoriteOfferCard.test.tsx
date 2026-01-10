import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoriteOfferCard from './FavoriteOfferCard';
import { makeFakeOfferBase } from '../../utils/test-mocks';
import { AppRoute } from '../../const';

vi.mock('../../hooks/useFavoriteOfferUpdate', () => ({
  useFavoriteOfferUpdate: vi.fn(() => vi.fn()),
}));

vi.mock('../BookmarkButton/BookmarkButton', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="bookmark-button" onClick={onClick}>Bookmark</button>
  ),
}));

describe('Component: FavoriteOfferCard', () => {
  it('should render correctly', () => {
    const offer = makeFakeOfferBase();
    render(
      <MemoryRouter>
        <FavoriteOfferCard offer={offer} />
      </MemoryRouter>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', offer.previewImage);
  });

  it('should render link to offer page', () => {
    const offer = makeFakeOfferBase();
    render(
      <MemoryRouter>
        <FavoriteOfferCard offer={offer} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href') === AppRoute.Offer(offer.id));
    expect(offerLink).toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    const offer = makeFakeOfferBase();
    render(
      <MemoryRouter>
        <FavoriteOfferCard offer={offer} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument();
  });

  it('should display price correctly', () => {
    const offer = makeFakeOfferBase();
    render(
      <MemoryRouter>
        <FavoriteOfferCard offer={offer} />
      </MemoryRouter>
    );

    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
  });
});
