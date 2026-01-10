import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookmarkButton from './BookmarkButton';

describe('Component: BookmarkButton', () => {
  const onClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with inactive state', () => {
    render(
      <BookmarkButton
        variant="place-card"
        isActive={false}
        width={18}
        height={19}
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render correctly with active state', () => {
    render(
      <BookmarkButton
        variant="offer"
        isActive={true}
        width={31}
        height={33}
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('offer__bookmark-button--active');
  });

  it('should call onClick when button is clicked', () => {
    render(
      <BookmarkButton
        variant="place-card"
        isActive={false}
        width={18}
        height={19}
        onClick={onClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have correct width and height attributes', () => {
    render(
      <BookmarkButton
        variant="place-card"
        isActive={false}
        width={18}
        height={19}
        onClick={onClick}
      />
    );

    const svg = screen.getByRole('button').querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '19');
  });
});
