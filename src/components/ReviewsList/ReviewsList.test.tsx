import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewsList from './ReviewsList';
import { rootReducer } from '../../store/root-reducer';
import { NameSpace, DefaultCity } from '../../const';
import { makeFakeOfferFull, makeFakeReview } from '../../utils/test-mocks';

vi.mock('../../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Component: ReviewsList', () => {
  const createStore = (initialState?: Partial<ReturnType<typeof rootReducer>>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState: {
        [NameSpace.Offer]: {
          offer: null,
          nearbyOffers: [],
          reviews: [],
          isOfferDataLoading: false,
          isNearbyOffersDataLoading: false,
          isReviewsDataLoading: false,
          isReviewDataPosting: false,
        },
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: false,
          error: null,
        },
        ...initialState,
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with reviews', () => {
    const offer = makeFakeOfferFull();
    const reviews = [makeFakeReview(), makeFakeReview()];
    const store = createStore({
      [NameSpace.Offer]: {
        offer,
        nearbyOffers: [],
        reviews,
        isOfferDataLoading: false,
        isNearbyOffersDataLoading: false,
        isReviewsDataLoading: false,
        isReviewDataPosting: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(reviews.length.toString())).toBeInTheDocument();
  });

  it('should render correctly with empty reviews', () => {
    const offer = makeFakeOfferFull();
    const store = createStore({
      [NameSpace.Offer]: {
        offer,
        nearbyOffers: [],
        reviews: [],
        isOfferDataLoading: false,
        isNearbyOffersDataLoading: false,
        isReviewsDataLoading: false,
        isReviewDataPosting: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should render review items', () => {
    const offer = makeFakeOfferFull();
    const reviews = [makeFakeReview(), makeFakeReview()];
    const store = createStore({
      [NameSpace.Offer]: {
        offer,
        nearbyOffers: [],
        reviews,
        isOfferDataLoading: false,
        isNearbyOffersDataLoading: false,
        isReviewsDataLoading: false,
        isReviewDataPosting: false,
      },
    });

    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    reviews.forEach((review) => {
      expect(screen.getByText(review.comment)).toBeInTheDocument();
      expect(screen.getByText(review.user.name)).toBeInTheDocument();
    });
  });
});
