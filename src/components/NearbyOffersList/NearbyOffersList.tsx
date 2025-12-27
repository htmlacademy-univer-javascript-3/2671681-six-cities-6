import { Offers } from '../../types/offers';
import OfferCard from '../OfferCard/OfferCard';

type NearbyOffersListProps = {
  offers: Offers;
};

function NearbyOffersList({ offers }: NearbyOffersListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} variant="near-places" />
        ))}
      </div>
    </section>
  );
}

export default NearbyOffersList;
