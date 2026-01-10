import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Header from '../../components/Header/Header';
import { getFavoriteOfferUpdatingStatus } from '../../store/favorite-data/selectors';
import { useOffersByCity } from '../../hooks/useOffersByCity';
import Spinner from '../../components/Spinner/Spinner';
import FavoritesContainer from '../../components/FavoritesContainer/FavoritesContainer';
import EmptyMainContainer from '../../components/EmptyMainContainer/EmptyMainContainer';

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
      {hasAnyOffers ? <FavoritesContainer offersByCityItems={offersByCityItems} /> : <EmptyMainContainer />}
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
