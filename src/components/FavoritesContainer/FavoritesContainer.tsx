import { OffersByCityItems } from '../../types/offers';
import FavoritesCitySection from '../FavoritesCitySection/FavoritesCitySection';

type FavoritesContainerProps = {
  offersByCityItems: OffersByCityItems;
}

function FavoritesContainer({ offersByCityItems }: FavoritesContainerProps): JSX.Element {
  return (
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
  );
}

export default FavoritesContainer;
