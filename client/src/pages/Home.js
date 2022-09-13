import React from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import css from './Home.module.css';

const posts = [
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p1',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p2',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p3',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p4',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p5',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p6',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
  {
    image: `https://placeimg.com/640/48${Math.floor(
      Math.random() * 10
    )}/nature`,
    title: 'To jest wyprawa w nieznane',
    postDate: new Date().toLocaleDateString(),
    _id: 'p7',
    author: 'Pawel Zguda',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'Azja',
  },
];

const Home = () => {
  console.log(posts);

  return (
    <>
      <Header />
      <div className={css.home}>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
