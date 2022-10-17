import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import css from './Home.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { SlidingPebbles } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';

// const posts = [
//   {
//     image: `https://placeimg.com/640/48${Math.floor(
//       Math.random() * 10
//     )}/nature`,
//     title: 'To jest wyprawa w nieznane',
//     postDate: new Date().toLocaleDateString(),
//     _id: 'p1',
//     author: 'Pawel Zguda',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     category: 'Azja',
//   }
// ];

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const sortedPosts = posts.sort((a, b) => b.postDate - a.postDate);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/posts${search}`
      );
      setPosts(res.data);
      res.data && setIsLoading(false);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className={css.home}>
        {isLoading ? (
          <div className={css.spinner}>
            <SlidingPebbles
              text={'Loading...'}
              bgColor={'transparent'}
              center={false}
              width={'150px'}
              height={'150px'}
            />
          </div>
        ) : (
          <Posts posts={sortedPosts} />
        )}

        <Sidebar extraStylesHome />
      </div>
    </>
  );
};

export default Home;
