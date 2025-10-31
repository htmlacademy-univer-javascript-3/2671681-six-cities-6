import { Offer } from '../../types/offers';
import OfferCardRating from '../OfferCardRating/OfferCardRating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavoriteOfferCardProps = {
  offer: Offer;
}

function FavoriteOfferCard({ offer }: FavoriteOfferCardProps): JSX.Element {
  return (
    <article key={offer.id} className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer(offer.id)}>
          <img
            className="place-card__image"
            src={offer.photo[0]}
            width={150}
            height={110}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">
                            /&nbsp;night
            </span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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

export default FavoriteOfferCard;
