import { memo, useCallback } from 'react';
import { OfferBase } from '../../types/offers';
import OfferCardRating from '../OfferCardRating/OfferCardRating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import BookmarkButton from '../BookmarkButton/BookmarkButton';
import { useFavoriteOfferUpdate } from '../../hooks/useFavoriteOfferUpdate';

type OfferCardProps = {
  offer: OfferBase;
  variant: string;
  setActive?: (offerId: OfferBase['id']) => void;
};

function OfferCard({ offer, variant, setActive }: OfferCardProps): JSX.Element {
  const onFavoriteClick = useFavoriteOfferUpdate();

  const handleMouseEnter = useCallback(() => {
    setActive?.(offer.id);
  }, [offer.id, setActive]);

  const handleMouseLeave = useCallback(() => {
    setActive?.('');
  }, [setActive]);

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${variant}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Offer(offer.id)}>
          <img
            className="place-card__image"
            src={offer.previewImage}
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

const MemoizedOfferCard = memo(OfferCard);
export default MemoizedOfferCard;
