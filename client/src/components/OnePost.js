import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import css from './OnePost.module.css';
import SelectCategory from './SelectCategory';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../context/Context';
import Modal from '../shared/uiElements/Modal';

const OnePost = () => {
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { user } = useContext(Context);
  const [category, setCategory] = useState('');
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const path = location.pathname.split('/')[2];
  const picturePath = 'http://localhost:5000/images/';

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCategory(res.data.category);
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

  const handleDelete = async () => {
    try {
      await axios.delete('/posts/' + path, {
        data: {
          username: user.username,
        },
      });
      history.push('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditedPost = async (e) => {
    console.log('edytowane');
    try {
      const res = await axios.put('/posts/' + path, {
        username: user.username,
        title,
        description,
        category,
      });

      (() => {
        if (res.data) {
          setEditMode(false);
          history.push('/');
        }
      })();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={css.onePost}>
      {isOpenModal && (
        <Modal
          setIsOpen={setIsOpenModal}
          title="Potwierdź"
          content="Potwierdzasz chęć usunięcia posta?"
          confirm={handleDelete}
        />
      )}{' '}
      <div className={css.onePostWrapper}>
        {post.photo && (
          <img
            className={css.onePostImg}
            src={picturePath + post.photo}
            alt=""
          />
        )}
        {editMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className={css.onePostTitleInput}
          />
        ) : (
          <h1 className={css.onePostTitle}>
            {post.title}
            {post.username === user?.username && (
              <div className={css.onePostEdit}>
                <i
                  className={`${css.onePostIcon} ${'far fa-edit'}`}
                  onClick={() => setEditMode(!editMode)}
                ></i>
                <i
                  className={`${css.onePostIcon} ${'far fa-trash-alt'}`}
                  onClick={() => setIsOpenModal(true)}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className={css.onePostInfo}>
          <span className={css.onePostAuthor}>
            Autor:
            <Link className="link" to={`/?uzytkownik=${post.username}`}>
              <b className={css.onePostAuthor}>{post.username}</b>
            </Link>
          </span>
          <span>{post.postDate}</span>
        </div>
        {editMode ? (
          <textarea
            rows="15"
            className={css.onePostDescInput}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className={css.onePostDesc}>{post.description}</p>
        )}
        {editMode && <SelectCategory value={category} cat={setCategory} />}
        {editMode && (
          <button className={css.onePostButton} onClick={handleEditedPost}>
            Wyślij
          </button>
        )}
      </div>
    </div>
  );
};

export default OnePost;
