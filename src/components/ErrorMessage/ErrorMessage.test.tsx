import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ErrorMessage from './ErrorMessage';
import { NameSpace } from '../../const';
import { DefaultCity } from '../../const';
import { rootReducer } from '../../store/root-reducer';
import { setError } from '../../store/main-data/main-data';

describe('Component: ErrorMessage', () => {
  it('should not render when there is no error', () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const { container } = render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render error message when error exists', () => {
    const errorMessage = 'Test error message';
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: false,
          error: errorMessage,
        },
      },
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should have correct styles', () => {
    const errorMessage = 'Test error';
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: false,
          error: errorMessage,
        },
      },
    });

    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toHaveStyle({
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      backgroundColor: '#ffe0e0',
      color: '#a00000',
    });
  });

  it('should update when error changes', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: false,
          error: null,
        },
      },
    });

    const { container: containerBefore, rerender } = render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(containerBefore.firstChild).toBeNull();

    store.dispatch(setError('New error'));

    rerender(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText('New error')).toBeInTheDocument();
  });
});
