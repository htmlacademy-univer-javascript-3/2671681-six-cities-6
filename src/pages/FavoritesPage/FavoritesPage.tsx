import { OffersByCityItems } from '../../types/offers';
import FavoritesCitySection from '../../components/FavoritesCitySection/FavoritesCitySection';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import Header from '../../components/Header/Header';
import { getOffers } from '../../store/main-data/selectors';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(getOffers);

  // Группировка по городу
  const offersByCityItems: OffersByCityItems = offers.reduce<OffersByCityItems>(
    (acc, offer) => {
      const group = acc.find((item) => item.city === offer.city.name);

      if (group) {
        group.offers.push(offer);
      } else {
        acc.push({ city: offer.city.name, offers: [offer] });
      }

      return acc;
    },
    []
  );

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offersByCityItems.map((offersByCityItem) => (
                <FavoritesCitySection
                  key={offersByCityItem.city}
                  offersByCityItem={offersByCityItem}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
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
