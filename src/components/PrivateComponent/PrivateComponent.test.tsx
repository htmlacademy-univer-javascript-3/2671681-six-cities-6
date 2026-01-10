import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateComponent from './PrivateComponent';
import { rootReducer } from '../../store/root-reducer';
import { NameSpace, DefaultCity, AuthorizationStatus } from '../../const';

describe('Component: PrivateComponent', () => {
  it('should render children when user is authorized', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          authInfo: null,
        },
        [NameSpace.Main]: {
          city: DefaultCity,
          offers: [],
          isOffersDataLoading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <PrivateComponent>
          <div>Private Content</div>
        </PrivateComponent>
      </Provider>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should not render children when user is not authorized', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
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
      },
    });

    const { container } = render(
      <Provider store={store}>
        <PrivateComponent>
          <div>Private Content</div>
        </PrivateComponent>
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
