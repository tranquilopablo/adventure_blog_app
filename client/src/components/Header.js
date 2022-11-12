import React from 'react';
import css from "./Header.module.css"

const Header = () => {
  return (
    <>
      <div className={css.header}>
        <img
          className={css.headerImg}
          src="https://images.unsplash.com/photo-1619944821572-e79218d48363?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className={css.headerTitle}>
          <p className={css.title}>Przygoda jest po drugiej stronie strachu</p>
        </div>
      </div>
    </>
  );
};

export default Header;
