import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../utils/test-mocks';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const review = makeFakeReview();
    render(<ReviewItem review={review} />);

    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toHaveAttribute('src', review.user.avatarUrl);
  });

  it('should format date correctly', () => {
    const review = makeFakeReview();
    const formattedDate = new Date(review.date).toLocaleString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    render(<ReviewItem review={review} />);

    const timeElement = screen.getByText(formattedDate);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.tagName.toLowerCase()).toBe('time');
    expect(timeElement).toHaveAttribute('dateTime', review.date);
  });

  it('should render rating component', () => {
    const review = makeFakeReview();
    render(<ReviewItem review={review} />);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
