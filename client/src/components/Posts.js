import React from 'react';
import css from './Posts.module.css';
import Post from './Post';

const Posts = ({ posts }) => {
  return (
    <div className={css.posts}>
      {posts.map((post) => {
      return  <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
