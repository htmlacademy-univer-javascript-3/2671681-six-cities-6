import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthInfo = (state: State) => state[NameSpace.User].authInfo;
