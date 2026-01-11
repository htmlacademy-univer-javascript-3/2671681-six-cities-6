import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import { rootReducer } from '../../store/root-reducer';
import { NameSpace, DefaultCity, AuthorizationStatus } from '../../const';
import { makeFakeAuthInfo, makeFakeOfferBase } from '../../utils/test-mocks';

vi.mock('../../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Component: Header', () => {
  const createStore = (initialState?: Partial<ReturnType<typeof rootReducer>>) => configureStore({
    reducer: rootReducer,
    preloadedState: {
      [NameSpace.Main]: {
        city: DefaultCity,
        offers: [],
        isOffersDataLoading: false,
        error: null,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: null,
      },
      [NameSpace.Favorite]: {
        offers: [],
        isOffersDataLoading: false,
        isOfferStatusUpdating: false,
      },
      ...initialState,
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly when user is not authorized', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('link', { name: /Sign in/i })[0]).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render correctly when user is authorized', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    const store = createStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: mockAuthInfo,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockAuthInfo.email)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });

  it('should display favorites count when user is authorized', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    const favoriteOffers = [makeFakeOfferBase(), makeFakeOfferBase()];
    const store = createStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: mockAuthInfo,
      },
      [NameSpace.Favorite]: {
        offers: favoriteOffers,
        isOffersDataLoading: false,
        isOfferStatusUpdating: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call logout action when sign out is clicked', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    const store = createStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: mockAuthInfo,
      },
    });

    const dispatchSpy = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const signOutLink = screen.getByText(/Sign out/i);
    fireEvent.click(signOutLink);

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should render logo link correctly', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logoLink = screen.getByAltText(/6 cities logo/i).closest('a');
    expect(logoLink).toBeInTheDocument();
  });
});
