import { describe, it, beforeEach, expect, vi } from 'vitest';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';

import { createAPI } from '../services/api';
import { AppThunkDispatch, extractActionsTypes } from '../utils/test-mocks';
import { State } from '../types/state';

import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchOfferReviewsAction,
  sendOfferReviewAction,
  fetchFavoriteOffersAction,
  updateFavoriteAction,
} from './api-actions';

import {
  makeFakeOfferBase,
  makeFakeOfferFull,
  makeFakeReview,
  makeFakeAuthInfo,
} from '../utils/test-mocks';

import { APIRoute } from '../const';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';

vi.mock('../services/process-error-handle', () => ({
  processErrorHandle: vi.fn(),
}));

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({} as State);
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response 200', async () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fetchOffersActionFulfilled.payload).toEqual(offers);
    });

    it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response 500', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(500);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      const authInfo = makeFakeAuthInfo();
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, authInfo);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const authInfo = makeFakeAuthInfo();
      const credentials = { email: 'test@test.com', password: '123456' };

      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, authInfo);

      await store.dispatch(loginAction(credentials));

      const types = extractActionsTypes(store.getActions());

      expect(types).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const authInfo = makeFakeAuthInfo();
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, authInfo);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction({ email: 'a', password: 'b' }));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(authInfo.token);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(401);

      await store.dispatch(loginAction({ email: 'a', password: 'b' }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async () => {
      const offer = makeFakeOfferFull();
      mockAxiosAdapter.onGet(APIRoute.Offer(offer.id)).reply(200, offer);

      await store.dispatch(fetchOfferAction(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOfferAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(offer);
    });

    it('should dispatch "fetchOfferAction.pending", "redirectToRoute", "fetchOfferAction.fulfilled" when server response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offer('bad')).reply(404);

      await store.dispatch(fetchOfferAction('bad'));

      const extractedActionsTypes = extractActionsTypes(store.getActions());

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        redirectToRoute.type,
        fetchOfferAction.fulfilled.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending", "fetchNearbyOffersAction.fulfilled", when server response 200', async () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      mockAxiosAdapter.onGet(APIRoute.OffersNearby('1')).reply(200, offers);

      await store.dispatch(fetchNearbyOffersAction('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyOffersActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type,
      ]);

      expect(fetchNearbyOffersActionFulfilled.payload).toEqual(offers);
    });
  });

  describe('fetchOfferReviewsAction', () => {
    it('should dispatch "fetchOfferReviewsAction.pending", "fetchOfferReviewsAction.fulfilled", when server response 200', async () => {
      const reviews = [makeFakeReview(), makeFakeReview()];
      mockAxiosAdapter.onGet(APIRoute.Reviews('1')).reply(200, reviews);

      await store.dispatch(fetchOfferReviewsAction('1'));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferReviewsActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchOfferReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.fulfilled.type,
      ]);

      expect(fetchOfferReviewsActionFulfilled.payload).toEqual(reviews);
    });
  });

  describe('sendOfferReviewAction', () => {
    it('should dispatch "sendOfferReviewAction.pending", "sendOfferReviewAction.fulfilled", when server response 200', async () => {
      const review = makeFakeReview();
      const data = { comment: 'ok', rating: 5 };

      mockAxiosAdapter.onPost(APIRoute.SendReview('1')).reply(200, review);

      await store.dispatch(
        sendOfferReviewAction({ offerId: '1', reviewData: data })
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendOfferReviewActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendOfferReviewAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        sendOfferReviewAction.pending.type,
        sendOfferReviewAction.fulfilled.type,
      ]);

      expect(sendOfferReviewActionFulfilled.payload).toEqual(review);
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch "fetchFavoriteOffersAction.pending", "fetchFavoriteOffersAction.fulfilled", when server response 200', async () => {
      const offers = [makeFakeOfferBase(), makeFakeOfferBase()];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, offers);

      await store.dispatch(fetchFavoriteOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteOffersActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteOffersAction.pending.type,
        fetchFavoriteOffersAction.fulfilled.type,
      ]);

      expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(offers);
    });
  });

  describe('updateFavoriteAction', () => {
    it('should dispatch "updateFavoriteAction.pending", "updateFavoriteAction.fulfilled", when server response 200', async () => {
      const offer = makeFakeOfferFull();
      mockAxiosAdapter
        .onPost(APIRoute.ChangeFavoriteOfferStatus(offer.id, true))
        .reply(200, offer);

      await store.dispatch(
        updateFavoriteAction({ offerId: offer.id, setIsFavorite: true })
      );
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        updateFavoriteAction.pending.type,
        updateFavoriteAction.fulfilled.type,
      ]);
    });
  });
});
