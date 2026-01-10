import { useState, FormEvent, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendOfferReviewAction } from '../../store/api-actions';
import {
  getOffer,
  getIsReviewDataPosting,
} from '../../store/offer-data/selectors';
import { ReviewData } from '../../types/reviews';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';

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
      dataForm.rating > 0 &&
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
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={5}
          id="5-stars"
          type="radio"
          checked={dataForm.rating === 5}
          onChange={() => handleRatingChange(5)}
          disabled={isReviewDataPosting}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={4}
          id="4-stars"
          type="radio"
          checked={dataForm.rating === 4}
          onChange={() => handleRatingChange(4)}
          disabled={isReviewDataPosting}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={3}
          id="3-stars"
          type="radio"
          checked={dataForm.rating === 3}
          onChange={() => handleRatingChange(3)}
          disabled={isReviewDataPosting}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={2}
          id="2-stars"
          type="radio"
          checked={dataForm.rating === 2}
          onChange={() => handleRatingChange(2)}
          disabled={isReviewDataPosting}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={1}
          id="1-star"
          type="radio"
          checked={dataForm.rating === 1}
          onChange={() => handleRatingChange(1)}
          disabled={isReviewDataPosting}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
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
