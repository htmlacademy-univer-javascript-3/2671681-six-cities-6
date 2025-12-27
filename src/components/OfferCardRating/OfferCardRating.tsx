type OfferCardRatingProps = {
  rating: number;
};

function OfferCardRating({ rating }: OfferCardRatingProps): JSX.Element {
  const widthRating = `${(Math.round(rating) / 5) * 100}%`;
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: widthRating }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default OfferCardRating;
