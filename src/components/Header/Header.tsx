import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getAuthInfo } from '../../store/user-process/selectors';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authInfo = useAppSelector(getAuthInfo);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logoutAction());
    },
    [dispatch]
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={AppRoute.Main}
              className="header__logo-link header__logo-link--active"
            >
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {authInfo?.email}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <Link onClick={handleLogout} to="/">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <Link to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </a>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

const MemoizedHeader = memo(Header);
export default MemoizedHeader;
