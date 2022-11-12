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
  const date = new Date(Number(post.postDate)).toLocaleDateString();

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/posts/${path}`
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setCategory(res.data.category);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL + `/posts/${path}`, {
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
      const res = await axios.put(
        process.env.REACT_APP_BACKEND_URL + `/posts/${path}`,
        {
          username: user.username,
          title,
          description,
          category,
        }
      );
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
      )}
      <div className={css.onePostWrapper}>
        {post.photo && (
          <img className={css.onePostImg} src={post.photo} alt="" />
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
          <span>{date}</span>
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
