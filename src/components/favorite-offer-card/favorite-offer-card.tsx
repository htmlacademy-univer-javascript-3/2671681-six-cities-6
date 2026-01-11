import { OfferBase } from '../../types/offers';
import OfferCardRating from '../offer-card-rating/offer-card-rating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useFavoriteOfferUpdate } from '../../hooks/use-favorite-offer-update';
import BookmarkButton from '../bookmark-button/bookmark-button';

type FavoriteOfferCardProps = {
  offer: OfferBase;
};

function FavoriteOfferCard({ offer }: FavoriteOfferCardProps): JSX.Element {

  const onFavoriteClick = useFavoriteOfferUpdate();

  return (
    <article key={offer.id} className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Offer(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
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
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton variant='place-card' width={18} height={19} isActive={offer.isFavorite} onClick={() => onFavoriteClick(offer.id, !offer.isFavorite)} />
        </div>
        <OfferCardRating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer(offer.id)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default FavoriteOfferCard;
