import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SortOptions from './SortOptions';
import { SortType } from './sort-constants';

describe('Component: SortOptions', () => {
  const onSortChange = vi.fn();
  const activeSort = SortType.Popular;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText(activeSort, { selector: '.places__sorting-type' })).toBeInTheDocument();
  });

  it('should show all sort options', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    // Click to open menu
    const sortType = screen.getByText(activeSort, { selector: '.places__sorting-type' });
    fireEvent.click(sortType);

    Object.values(SortType).forEach((sort) => {
      expect(screen.getByText(sort, { selector: '.places__option' })).toBeInTheDocument();
    });
  });

  it('should highlight active sort option', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    // Click to open menu
    const sortType = screen.getByText(activeSort, { selector: '.places__sorting-type' });
    fireEvent.click(sortType);

    const activeOption = screen.getByText(activeSort, { selector: '.places__option' });
    expect(activeOption).toHaveClass('places__option--active');
  });

  it('should toggle sort menu when clicked', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    const sortType = screen.getByText(activeSort, { selector: '.places__sorting-type' });
    const sortList = screen.getByRole('list');

    expect(sortList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortType);

    expect(sortList).toHaveClass('places__options--opened');
  });

  it('should call onSortChange when sort option is clicked', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    const sortType = screen.getByText(activeSort, { selector: '.places__sorting-type' });
    fireEvent.click(sortType);

    const priceLowToHighOption = screen.getByText(SortType.PriceLowToHigh, { selector: '.places__option' });
    fireEvent.click(priceLowToHighOption);

    expect(onSortChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);
    expect(onSortChange).toHaveBeenCalledTimes(1);
  });

  it('should close sort menu after selecting option', () => {
    render(<SortOptions activeSort={activeSort} onSortChange={onSortChange} />);

    const sortType = screen.getByText(activeSort, { selector: '.places__sorting-type' });
    fireEvent.click(sortType);

    const sortList = screen.getByRole('list');
    expect(sortList).toHaveClass('places__options--opened');

    const topRatedOption = screen.getByText(SortType.TopRated, { selector: '.places__option' });
    fireEvent.click(topRatedOption);

    expect(sortList).not.toHaveClass('places__options--opened');
  });
});
