import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import css from './Home.module.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className={css.home}>
        <Posts />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
