import { useState } from 'react';

function ReviewForm(): JSX.Element {

  const [dataForm, setDataForm] = useState({
    rating: 0,
    text: '',
  });

  return (
    <form className="reviews__form form" action="#" method="post">
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
                    Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          checked={dataForm.rating === 5}
          onChange={() => setDataForm({...dataForm, rating: 5})}
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
          defaultValue={4}
          id="4-stars"
          type="radio"
          checked={dataForm.rating === 4}
          onChange={() => setDataForm({...dataForm, rating: 4})}
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
          defaultValue={3}
          id="3-stars"
          type="radio"
          checked={dataForm.rating === 3}
          onChange={() => setDataForm({...dataForm, rating: 3})}
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
          defaultValue={2}
          id="2-stars"
          type="radio"
          checked={dataForm.rating === 2}
          onChange={() => setDataForm({...dataForm, rating: 2})}
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
          defaultValue={1}
          id="1-star"
          type="radio"
          checked={dataForm.rating === 1}
          onChange={() => setDataForm({...dataForm, rating: 1})}
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
        defaultValue={dataForm.text}
        onChange={(evt) => setDataForm({...dataForm, text: evt.target.value})}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                      To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
                      your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
                      Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
