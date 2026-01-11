import { describe, it, expect } from 'vitest';
import { userProcess } from './user-process';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from '../api-actions';
import { makeFakeAuthInfo } from '../../utils/test-mocks';

describe('userProcess', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    authInfo: null,
  };

  it('should return initial state with undefined', () => {
    const action = { type: 'unknown' };
    const result = userProcess.reducer(undefined, action);

    expect(result).toEqual(initialState);
  });

  describe('checkAuthAction', () => {
    it('should set authorizationStatus to Auth and authInfo on fulfilled', () => {
      const authInfo = makeFakeAuthInfo();
      const action = {
        type: checkAuthAction.fulfilled.type,
        payload: authInfo,
      };
      const result = userProcess.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.authInfo).toEqual(authInfo);
    });

    it('should set authorizationStatus to NoAuth and authInfo to null on rejected', () => {
      const stateWithAuth = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: makeFakeAuthInfo(),
      };
      const action = { type: checkAuthAction.rejected.type };
      const result = userProcess.reducer(stateWithAuth, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.authInfo).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should set authorizationStatus to Auth and authInfo on fulfilled', () => {
      const authInfo = makeFakeAuthInfo();
      const action = {
        type: loginAction.fulfilled.type,
        payload: authInfo,
      };
      const result = userProcess.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.authInfo).toEqual(authInfo);
    });

    it('should set authorizationStatus to NoAuth and authInfo to null on rejected', () => {
      const stateWithAuth = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: makeFakeAuthInfo(),
      };
      const action = { type: loginAction.rejected.type };
      const result = userProcess.reducer(stateWithAuth, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.authInfo).toBeNull();
    });
  });

  describe('logoutAction', () => {
    it('should set authorizationStatus to NoAuth and authInfo to null on fulfilled', () => {
      const stateWithAuth = {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: makeFakeAuthInfo(),
      };
      const action = { type: logoutAction.fulfilled.type };
      const result = userProcess.reducer(stateWithAuth, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.authInfo).toBeNull();
    });

    it('should handle logout from initial state', () => {
      const action = { type: logoutAction.fulfilled.type };
      const result = userProcess.reducer(initialState, action);

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.authInfo).toBeNull();
    });
  });
});
