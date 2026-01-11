import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../types/state';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeEach(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
    browserHistory.push('');
  });

  it('should redirect to "/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Main);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should redirect to "/favorites" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Favorites);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Favorites);
  });

  it('should redirect to "/offer/:id" with redirectToRoute action', () => {
    const offerId = 'test-id';
    const redirectAction = redirectToRoute(AppRoute.Offer(offerId));
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Offer(offerId));
  });

  it('should not redirect with empty action', () => {
    const emptyAction = { type: 'unknown/action', payload: AppRoute.Login };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Login);
  });
});
