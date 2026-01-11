import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewForm from './ReviewForm';
import { rootReducer } from '../../store/root-reducer';
import { NameSpace, DefaultCity, MIN_COMMENT_LENGTH } from '../../const';
import { makeFakeOfferFull } from '../../utils/test-mocks';

vi.mock('../../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Component: ReviewForm', () => {
  const createStore = (initialState?: Partial<ReturnType<typeof rootReducer>>) => configureStore({
    reducer: rootReducer,
    preloadedState: {
      [NameSpace.Offer]: {
        offer: makeFakeOfferFull(),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', () => {
    const store = createStore();
    const { container } = render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    const rating5Input = container.querySelector('[id="5-stars"]') as HTMLInputElement;
    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);

    fireEvent.click(rating5Input);
    fireEvent.change(textarea, { target: { value: 'a'.repeat(MIN_COMMENT_LENGTH) } });

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should update rating when star is clicked', () => {
    const store = createStore();
    const { container } = render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    const rating3Input = container.querySelector('[id="3-stars"]') as HTMLInputElement;
    fireEvent.click(rating3Input);
    expect(rating3Input).toBeChecked();
  });

  it('should update comment when textarea value changes', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
    const testComment = 'This is a test comment';
    fireEvent.change(textarea, { target: { value: testComment } });

    expect(textarea).toHaveValue(testComment);
  });

  it('should disable form when review is posting', () => {
    const store = createStore({
      [NameSpace.Offer]: {
        offer: makeFakeOfferFull(),
        nearbyOffers: [],
        reviews: [],
        isOfferDataLoading: false,
        isNearbyOffersDataLoading: false,
        isReviewsDataLoading: false,
        isReviewDataPosting: true,
      },
    });

    render(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Sending/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');
  });
});
