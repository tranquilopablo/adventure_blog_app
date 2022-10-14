import React from 'react';
import css from './Post.module.css';
import { Link } from 'react-router-dom';

const Post = ({ post, extraStylesHome }) => {
  const picturePath = 'http://localhost:5000/images/';

  return (
    <div className={css.post }>
      {post.photo && (
        <Link className="link" to={`/post/${post._id}`}>
          <img
            src={picturePath + post.photo}
            alt={post.title}
            className={css.postImg}
          />
        </Link>
      )}
      <div className={css.postInfo}>
        <div className={css.postCat}>{post.category}</div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className={css.postTitle}>{post.title}</span>
        </Link>
        <hr />
        <div className={css.postDetails}>
          <Link className="link" to={`/?uzytkownik=${post.username}`}>
            <span className={css.postDate}>{post.username}</span>
          </Link>
          <span className={css.postDate}>{post.postDate}</span>
        </div>
      </div>
      <p className={css.postDesc}>{post.description}</p>
    </div>
  );
};

export default Post;
