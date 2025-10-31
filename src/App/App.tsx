import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import OfferPage from '../pages/OfferPage/OfferPage';
import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import { AppRoute, AuthorizationStatus } from '../const';
import { Offers } from '../types/offers';


type AppProps = {
  offers: Offers;
};

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.OfferTemplate} element={<OfferPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
