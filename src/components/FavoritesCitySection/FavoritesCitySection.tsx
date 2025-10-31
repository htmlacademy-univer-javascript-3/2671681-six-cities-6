import { OffersByCityItem } from '../../types/offers';
import FavoriteOfferCard from '../FavoriteOfferCard/FavoriteOfferCard';

type FavoritesCitySectionProps = {
  offersByCityItem: OffersByCityItem;
}

function FavoritesCitySection({ offersByCityItem }: FavoritesCitySectionProps): JSX.Element {
  return (
    <li key={offersByCityItem.city} className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{offersByCityItem.city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offersByCityItem.offers.map((offer) => (
          <FavoriteOfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesCitySection;

