import React from 'react';
import css from './Topbar.module.css';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const user = false;
  return (
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
        <div className={`${css['img-box']}`}>
          <Link to="/ustawienia">
            <img
              className={css.avatar}
              src="https://images.unsplash.com/photo-1514929781313-76fcbb2136b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
              alt=""
            />
          </Link>
        </div>
        {user ? (
          <p className={css.login}>WYLOGUJ</p>
        ) : (
          <p className={css.login}>
            <Link className="link" to="/login">
              LOGIN
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Topbar;
