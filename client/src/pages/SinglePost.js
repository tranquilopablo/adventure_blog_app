import React from 'react';
import css from './SinglePost.module.css';
import Sidebar from '../components/Sidebar';
import OnePost from '../components/OnePost';

const SinglePost = () => {
  return (
    <div className={css.single}>
      <OnePost/>
      <Sidebar extrastyles/>
    </div>
  )
};

export default SinglePost;
