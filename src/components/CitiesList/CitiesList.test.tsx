import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CitiesList from './CitiesList';
import { CityNames } from '../../const';

describe('Component: CitiesList', () => {
  const setActive = vi.fn();
  const activeCity = CityNames.Paris;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with all cities', () => {
    render(<CitiesList activeCity={activeCity} setActive={setActive} />);

    Object.values(CityNames).forEach((cityName) => {
      expect(screen.getByText(cityName)).toBeInTheDocument();
    });
  });

  it('should highlight active city', () => {
    render(<CitiesList activeCity={activeCity} setActive={setActive} />);

    const activeCityElement = screen.getByText(activeCity).closest('a');
    expect(activeCityElement).toHaveClass('tabs__item--active');
  });

  it('should call setActive when city is clicked', () => {
    render(<CitiesList activeCity={activeCity} setActive={setActive} />);

    const cologneCity = screen.getByText(CityNames.Cologne);
    fireEvent.click(cologneCity);

    expect(setActive).toHaveBeenCalledTimes(1);
    expect(setActive).toHaveBeenCalledWith(CityNames.Cologne);
  });

  it('should not highlight inactive cities', () => {
    render(<CitiesList activeCity={activeCity} setActive={setActive} />);

    const cologneCity = screen.getByText(CityNames.Cologne).closest('a');
    expect(cologneCity).not.toHaveClass('tabs__item--active');
  });
});
