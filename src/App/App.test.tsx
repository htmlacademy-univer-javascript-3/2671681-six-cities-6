import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { withStore } from '../utils/test-utils';
import { makeFakeStore } from '../utils/make-fake-store';
import { makeFakeOfferBase, makeFakeOfferFull, makeFakeAuthInfo, makeFakeReview } from '../utils/test-mocks';
import { AppRoute, AuthorizationStatus, NameSpace, CITIES, DefaultCity } from '../const';
import browserHistory from '../browser-history';

vi.mock('../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Application Routing', () => {
  beforeEach(() => {
    // Reset browserHistory before each test
    if (browserHistory.location.pathname !== '/') {
      browserHistory.replace('/');
    }
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    browserHistory.push(AppRoute.Main);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getAllByRole('link', { name: /Sign in/i })[0]).toBeInTheDocument();
    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should render "LoginPage" when user navigate to "/login" and unauthorized', () => {
    browserHistory.push(AppRoute.Login);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigate to "/login" and authorized', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    browserHistory.push(AppRoute.Login);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          authInfo: mockAuthInfo,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockAuthInfo.email)).toBeInTheDocument();
    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should render "Spinner" when offers are loading', () => {
    browserHistory.push(AppRoute.Main);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: true,
          error: null,
        },
      })
    );

    render(withStoreComponent);

    const spinnerContainer = screen.getAllByRole('generic')[0];
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites" and authorized', () => {
    const mockAuthInfo = makeFakeAuthInfo();
    const favoriteOffers = [makeFakeOfferBase(), makeFakeOfferBase()];
    browserHistory.push(AppRoute.Favorites);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          authInfo: mockAuthInfo,
        },
        [NameSpace.Favorite]: {
          offers: favoriteOffers,
          isOffersDataLoading: false,
          isOfferStatusUpdating: false,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockAuthInfo.email)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/favorites" and unauthorized', () => {
    browserHistory.push(AppRoute.Favorites);
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id" and offer exists', () => {
    const mockOffer = makeFakeOfferFull();
    const mockNearbyOffers = [makeFakeOfferBase(), makeFakeOfferBase()];
    const mockReviews = [makeFakeReview(), makeFakeReview()];
    browserHistory.push(AppRoute.Offer(mockOffer.id));
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        [NameSpace.Offer]: {
          offer: mockOffer,
          nearbyOffers: mockNearbyOffers,
          reviews: mockReviews,
          isOfferDataLoading: false,
          isNearbyOffersDataLoading: false,
          isReviewsDataLoading: false,
          isReviewDataPosting: false,
        },
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('should render "Spinner" when offer is loading', () => {
    browserHistory.push(AppRoute.Offer('test-id'));
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore({
        [NameSpace.Offer]: {
          offer: null,
          nearbyOffers: [],
          reviews: [],
          isOfferDataLoading: true,
          isNearbyOffersDataLoading: false,
          isReviewsDataLoading: false,
          isReviewDataPosting: false,
        },
      })
    );

    render(withStoreComponent);

    const spinnerContainer = screen.getAllByRole('generic')[0];
    expect(spinnerContainer).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    browserHistory.push('/non-existent-route');
    const { withStoreComponent } = withStore(
      <App />,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вернуться на главную/i })).toBeInTheDocument();
  });
});
