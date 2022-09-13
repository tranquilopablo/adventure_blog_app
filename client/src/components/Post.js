import React from 'react';
import css from './Post.module.css';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <div className={css.post}>
      {post.image && (
        <Link className="link" to={`/post/${post._id}`}>
          <img src={post.image} alt={post.title} className={css.postImg} />
        </Link>
      )}
      <div className={css.postInfo}>
        <div className={css.postCat}>{post.category}</div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className={css.postTitle}>{post.title}</span>
        </Link>
        <hr />
        <div className={css.postDetails}>
          <Link className="link"  to={`/?uzytkownik=${post.author}`}>
            <span className={css.postDate}>{post.author}</span>
          </Link>
          <span className={css.postDate}>{post.postDate}</span>
        </div>
      </div>
      <p className={css.postDesc}>{post.description}</p>
    </div>
  );
};

export default Post;
