export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  OfferTemplate: '/offer/:id',
  Offer: (id: number) => `/offer/${id}`,
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
