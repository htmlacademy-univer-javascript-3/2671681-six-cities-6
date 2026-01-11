import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { MemoryHistory, createMemoryHistory } from 'history';
import PrivateRoute from './private-route';
import { withHistory, withStore } from '../../utils/test-utils';
import { makeFakeStore } from '../../utils/make-fake-store';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeAuthInfo } from '../../utils/test-mocks';

vi.mock('../../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render children when user is authorized', () => {
    const expectedText = 'Private content';
    const mockAuthInfo = makeFakeAuthInfo();
    mockHistory.push(AppRoute.Favorites);
    const { withStoreComponent } = withStore(
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<span>Login</span>} />
      </Routes>,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.Auth,
          authInfo: mockAuthInfo,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    const expectedText = 'Private content';
    mockHistory.push(AppRoute.Favorites);
    const { withStoreComponent } = withStore(
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<span>Login Page</span>} />
      </Routes>,
      makeFakeStore({
        [NameSpace.User]: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          authInfo: null,
        },
      })
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.queryByText(expectedText)).not.toBeInTheDocument();
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
