import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';
import css from './Home.module.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SlidingPebbles } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css';



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
