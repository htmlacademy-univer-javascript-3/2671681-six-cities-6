import { Offer } from '../../types/offers';
import OfferCardRating from '../OfferCardRating/OfferCardRating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type OfferCardProps = {
  offer: Offer;
  setActive: (offerId: number) => void;
}

function OfferCard({ offer, setActive }: OfferCardProps): JSX.Element {
  return (
    <article key={offer.id} className="cities__card place-card" onMouseEnter={() => {
      setActive(offer.id);
    }}
    >
      {offer.premium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer(offer.id)}>
          <img
            className="place-card__image"
            src={offer.photo[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={
            offer.bookmark
              ? 'place-card__bookmark-button place-card__bookmark-button--active button'
              : 'place-card__bookmark-button button'
          } type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <OfferCardRating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.features.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
