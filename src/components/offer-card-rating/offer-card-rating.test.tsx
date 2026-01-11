import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfferCardRating from './offer-card-rating';
import { MAX_RATING } from '../../const';

describe('Component: OfferCardRating', () => {
  it('should render correctly with rating', () => {
    const rating = 4;
    render(<OfferCardRating rating={rating} />);

    expect(screen.getByText('Rating')).toBeInTheDocument();
    const ratingStars = screen.getByText('Rating').parentElement;
    expect(ratingStars).toHaveClass('rating__stars');
  });

  it('should calculate width correctly for rating 5', () => {
    const rating = 5;
    render(<OfferCardRating rating={rating} />);

    const spanElement = screen.getByText('Rating').previousElementSibling as HTMLElement;
    const expectedWidth = `${(Math.round(rating) / MAX_RATING) * 100}%`;
    expect(spanElement).toHaveStyle({ width: expectedWidth });
  });

  it('should calculate width correctly for rating 3', () => {
    const rating = 3;
    render(<OfferCardRating rating={rating} />);

    const spanElement = screen.getByText('Rating').previousElementSibling as HTMLElement;
    const expectedWidth = `${(Math.round(rating) / MAX_RATING) * 100}%`;
    expect(spanElement).toHaveStyle({ width: expectedWidth });
  });

  it('should round rating correctly', () => {
    const rating = 4.7;
    render(<OfferCardRating rating={rating} />);

    const spanElement = screen.getByText('Rating').previousElementSibling as HTMLElement;
    const expectedWidth = `${(Math.round(rating) / MAX_RATING) * 100}%`;
    expect(spanElement).toHaveStyle({ width: expectedWidth });
  });
});
