import React, { useState, FormEvent, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOfferReviewAction } from '../../store/api-actions';
import {
  getOffer,
  getIsReviewDataPosting,
} from '../../store/offer-data/selectors';
import { ReviewData } from '../../types/reviews';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, MAX_RATING, MIN_RATING } from '../../const';

const RATING_VALUES = Array.from({ length: MAX_RATING }, (_, i) => MAX_RATING - i);

const RATING_TITLES: Record<number, string> = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
} as const;

function ReviewForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOffer);
  const isReviewDataPosting = useAppSelector(getIsReviewDataPosting);

  const [dataForm, setDataForm] = useState<ReviewData>({
    rating: 0,
    comment: '',
  });

  const isFormValid = useMemo(
    () =>
      dataForm.rating >= MIN_RATING &&
      dataForm.comment.length >= MIN_COMMENT_LENGTH &&
      dataForm.comment.length <= MAX_COMMENT_LENGTH,
    [dataForm.rating, dataForm.comment.length]
  );

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (offer?.id && isFormValid && !isReviewDataPosting) {
        dispatch(
          sendOfferReviewAction({ offerId: offer.id, reviewData: dataForm })
        )
          .unwrap()
          .then(() => {
            setDataForm({
              rating: 0,
              comment: '',
            });
          })
          .catch(() => {
            // Обработка ошибки отправки отзыва
          });
      }
    },
    [dispatch, offer?.id, isFormValid, isReviewDataPosting, dataForm]
  );

  const handleRatingChange = useCallback((rating: number) => {
    setDataForm((prev) => ({ ...prev, rating }));
  }, []);

  const handleCommentChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDataForm((prev) => ({ ...prev, comment: evt.target.value }));
    },
    []
  );

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_VALUES.map((rating) => (
          <React.Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={dataForm.rating === rating}
              onChange={() => handleRatingChange(rating)}
              disabled={isReviewDataPosting}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[rating]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={dataForm.comment}
        onChange={handleCommentChange}
        disabled={isReviewDataPosting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isReviewDataPosting}
        >
          {isReviewDataPosting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
