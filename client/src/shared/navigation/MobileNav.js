import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import css from './MobileNav.module.css';

const MobileNav = ({ closeSideMenu }) => {
  const { user, dispatch } = useContext(Context);
  // const picturePath = 'http://localhost:5000/images/';

  const logout = () => {
    closeSideMenu();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <React.Fragment>
      <div className={css.backdrop}></div>
      <div className={css.topbar}>
        <ul className={css['list-wrapper']}>
          <li className={css['list-item']}>
            <Link className="link" to="/" onClick={closeSideMenu}>
              STRONA GŁÓWNA
            </Link>
          </li>
          {user && (
            <li className={css['list-item']}>
              <Link className="link" to="/napisz" onClick={closeSideMenu}>
                NAPISZ
              </Link>
            </li>
          )}

          {user && (
            <div className={`${css['img-box']}`}>
              <Link to="/ustawienia" onClick={closeSideMenu}>
                <img
                  className={css.avatar}
                  src={user.profilePic}
                  alt="my avatar"
                />
              </Link>
            </div>
          )}

          {user ? (
            <p className={css.login} onClick={logout}>
              WYLOGUJ
            </p>
          ) : (
            <p className={css.login}>
              <Link className="link" to="/login" onClick={closeSideMenu}>
                LOGIN
              </Link>
            </p>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MobileNav;
