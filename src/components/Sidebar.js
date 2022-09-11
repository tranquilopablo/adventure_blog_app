import React from 'react';
import css from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const categories = [
  'Azja',
  'Europa',
  'Afryka',
  'Ameryka Płd.',
  'Australia i Oceania',
  'Ameryka Pół.',
  'Antarktyda',
];

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.sidebarItem}>
        <span className={css.sidebarTitle}>ŚWIAT</span>
        <img
          src="https://images.unsplash.com/photo-1584974292709-5c2f0619971b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </div>
      <div className={css.sidebarItem}>
        <span className={css.sidebarTitle}>KATEGORIE</span>
        <ul className={css.sidebarList}>
          {categories.map((cat) => (
            <Link key={cat} to={`/?kategoria=${cat}`}>
              <li className={css.sidebarListItem}>{cat}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
