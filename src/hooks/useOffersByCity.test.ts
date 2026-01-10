import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOffersByCity } from './useOffersByCity';
import { NameSpace, DefaultCity, CityNames } from '../const';
import { makeFakeOfferBase } from '../utils/test-mocks';
import { createWrapperWithStore } from '../utils/test-utils';

vi.mock('../store/index', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  },
}));

vi.mock('../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Hook: useOffersByCity', () => {
  it('should return empty array when there are no favorite offers', () => {
    const initialState = {
      [NameSpace.Favorite]: {
        offers: [],
        isOffersDataLoading: false,
        isOfferStatusUpdating: false,
      },
    };

    const wrapper = createWrapperWithStore(initialState);
    const { result } = renderHook(() => useOffersByCity(), {
      wrapper,
    });

    expect(result.current).toEqual([]);
  });

  it('should group offers by city correctly', () => {
    const offer1 = { ...makeFakeOfferBase(), id: '1', city: { ...DefaultCity, name: CityNames.Paris } };
    const offer2 = { ...makeFakeOfferBase(), id: '2', city: { ...DefaultCity, name: CityNames.Paris } };
    const offer3 = { ...makeFakeOfferBase(), id: '3', city: { ...DefaultCity, name: CityNames.Cologne } };

    const initialState = {
      [NameSpace.Favorite]: {
        offers: [offer1, offer2, offer3],
        isOffersDataLoading: false,
        isOfferStatusUpdating: false,
      },
    };

    const wrapper = createWrapperWithStore(initialState);
    const { result } = renderHook(() => useOffersByCity(), {
      wrapper,
    });

    expect(result.current).toHaveLength(2);
    expect(result.current[0].city).toBe(CityNames.Paris);
    expect(result.current[0].offers).toHaveLength(2);
    expect(result.current[1].city).toBe(CityNames.Cologne);
    expect(result.current[1].offers).toHaveLength(1);
  });

  it('should memoize result when offers do not change', () => {
    const offer1 = makeFakeOfferBase();
    const initialState = {
      [NameSpace.Favorite]: {
        offers: [offer1],
        isOffersDataLoading: false,
        isOfferStatusUpdating: false,
      },
    };

    const wrapper = createWrapperWithStore(initialState);
    const { result, rerender } = renderHook(() => useOffersByCity(), {
      wrapper,
    });

    const firstResult = result.current;
    rerender();

    expect(result.current).toBe(firstResult);
  });
});
