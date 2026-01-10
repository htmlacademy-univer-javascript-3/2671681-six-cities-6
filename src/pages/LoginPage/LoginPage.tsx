import { Link, Navigate } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus,
  CITIES,
  DefaultCity,
} from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthDate } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';
import { FormEvent, useRef } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { pickRandom } from '../../utils/random-utils';
import { setCity } from '../../store/main-data/main-data';

const isValidPassword = (password: string) => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLetter && hasDigit;
};

function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const randomCity = pickRandom(CITIES) ?? DefaultCity;

  const handleMainPageRedirect = () => {
    dispatch(setCity(randomCity));
  };

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} replace />;
  }

  const onSubmit = (authData: AuthDate) => {
    if (isValidPassword(authData.password)) {
      dispatch(loginAction(authData));
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item" onClick={handleMainPageRedirect}>
              <Link
                className="locations__item-link"
                onClick={handleMainPageRedirect}
                to={AppRoute.Main}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
