import { memo, useMemo } from 'react';
import { Review } from '../../types/reviews';
import ReviewItemRating from '../review-item-rating/review-item-rating';

type ReviewItemProps = {
  review: Review;
};

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const formattedDate = useMemo(
    () =>
      new Date(review.date).toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [review.date]
  );

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <ReviewItemRating rating={review.rating} />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}

const MemoizedReviewItem = memo(ReviewItem);
export default MemoizedReviewItem;
