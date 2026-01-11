import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { useFavoriteOfferUpdate } from './use-favorite-offer-update';
import { AuthorizationStatus, NameSpace, AppRoute, DefaultCity } from '../const';
import { makeFakeAuthInfo } from '../utils/test-mocks';
import { createWrapperWithStoreAndHistory } from '../utils/test-utils';

vi.mock('../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Hook: useFavoriteOfferUpdate', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    vi.clearAllMocks();
  });

  it('should navigate to login when user is not authorized', () => {
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: null,
      },
      [NameSpace.Main]: {
        city: DefaultCity,
        offers: [],
        isOffersDataLoading: false,
        error: null,
      },
    };

    const wrapper = createWrapperWithStoreAndHistory(initialState, mockHistory);
    const { result } = renderHook(() => useFavoriteOfferUpdate(), {
      wrapper,
    });

    result.current('test-id', true);

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should dispatch updateFavoriteAction when user is authorized', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    const initialState = {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: mockAuthInfo,
      },
      [NameSpace.Main]: {
        city: DefaultCity,
        offers: [],
        isOffersDataLoading: false,
        error: null,
      },
    };

    const wrapper = createWrapperWithStoreAndHistory(initialState, mockHistory);
    const { result } = renderHook(() => useFavoriteOfferUpdate(), {
      wrapper,
    });

    result.current('test-id', true);

    expect(mockHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
