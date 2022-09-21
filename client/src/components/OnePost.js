import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from './OnePost.module.css';
import SelectCategory from './SelectCategory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OnePost = () => {
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const [post, setPost] = useState({});

  const path = location.pathname.split('/')[2];
  const picturePath = 'http://localhost:5000/images/';


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  // const post = {
  //   photo: `https://placeimg.com/640/48${Math.floor(
  //     Math.random() * 10
  //   )}/nature`,
  //   title: 'To jest wyprawa w nieznane',
  //   postDate: new Date().toLocaleDateString(),
  //   _id: 'p1',
  //   username: 'Pawel Zguda',
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //   category: 'Azja',
  // };

  return (
    <div className={css.onePost}>
      <div className={css.onePostWrapper}>
        {post.photo && (
          <img className={css.onePostImg} src={picturePath + post.photo} alt="" />
        )}

        <h1 className={css.onePostTitle}>
          {post.title}
          <div className={css.onePostEdit}>
            <i
              className={`${css.onePostIcon} ${'far fa-edit'}`}
              onClick={() => setEditMode(!editMode)}
            ></i>
            <i className={`${css.onePostIcon} ${'far fa-trash-alt'}`}></i>
          </div>
        </h1>
        <div className={css.onePostInfo}>
          <span className={css.onePostAuthor}>
            Autor:
            <Link className="link" to={`/?uzytkownik=${post.username}`}>
              <b className={css.onePostAuthor}>{post.username}</b>
            </Link>
          </span>
          <span>{post.postDate}</span>
        </div>
        <p className={css.onePostDesc}>{post.description}</p>
        {editMode && <SelectCategory />}
        {editMode && <button className={css.onePostButton}>Wyślij</button>}
      </div>
    </div>
  );
};

export default OnePost;
