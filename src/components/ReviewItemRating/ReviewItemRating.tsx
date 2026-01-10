import { MAX_RATING } from '../../const';

type ReviewItemRatingProps = {
  rating: number;
};

function ReviewItemRating({ rating }: ReviewItemRatingProps): JSX.Element {
  const widthRating = `${(Math.round(rating) / MAX_RATING) * 100}%`;

  return (
    <div className="reviews__rating rating">
      <div className="reviews__stars rating__stars">
        <span style={{ width: widthRating }} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default ReviewItemRating;
