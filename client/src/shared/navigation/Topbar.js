import React, { useContext, useState } from 'react';
import css from './Topbar.module.css';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import MobileNav from './MobileNav';
import { Fade as Hamburger } from 'hamburger-react';

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  // const picturePath = 'http://localhost:5000/images/';
  const [isOpen, setOpen] = useState(false);

  const openSideMenu = () => {
    setOpen((prevState) => !prevState);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };
 
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <React.Fragment>
      {isOpen && <MobileNav closeSideMenu={openSideMenu} />}
      <div className={css.topbar}>
        <ul className={css['list-wrapper']}>
          <li className={css['list-item']}>
            <Link className="link" to="/">
              STRONA GŁÓWNA
            </Link>
          </li>
          {user && (
            <li className={css['list-item']}>
              <Link className="link" to="/napisz">
                NAPISZ
              </Link>
            </li>
          )}
        </ul>
        <div className={css.right}>
          {user && (
            <div className={`${css['img-box']}`}>
              <Link to="/ustawienia">
                <img
                  className={css.avatar}
                  src={user.profilePic}
                  alt=""
                />
              </Link>
            </div>
          )}

          {user ? (
            <p className={css.login} onClick={handleLogout}>
              WYLOGUJ
            </p>
          ) : (
            <p className={css.login}>
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </p>
          )}
        </div>
        <div className={css.hamburger}>
          <Hamburger rounded toggled={isOpen} toggle={openSideMenu} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Topbar;
