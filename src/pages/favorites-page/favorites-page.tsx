import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header';
import { getFavoriteOfferUpdatingStatus } from '../../store/favorite-data/selectors';
import { useOffersByCity } from '../../hooks/use-offers-by-city';
import Spinner from '../../components/spinner/spinner';
import FavoritesContainer from '../../components/favorites-container/favorites-container';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

function FavoritesPage(): JSX.Element {
  const isFavoriteOffersDataLoading = useAppSelector(getFavoriteOfferUpdatingStatus);
  const offersByCityItems = useOffersByCity();
  const hasAnyOffers = offersByCityItems.length > 0;

  if (isFavoriteOffersDataLoading) {
    return <Spinner />;
  }

  return (
    <div className={`page ${hasAnyOffers ? '' : 'page--favorites-empty'}`}>
      <Header />
      {hasAnyOffers ? <FavoritesContainer offersByCityItems={offersByCityItems} /> : <FavoritesEmpty />}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
