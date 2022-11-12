import React, { useContext, useState } from 'react';
import SelectCategory from '../components/SelectCategory';
import { Context } from '../context/Context';
import axios from 'axios';
import css from './Write.module.css';
import { useHistory } from 'react-router-dom';

const Write = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Europa');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
      category,
      postDate: new Date().getTime()
    };

    let data;
    if (file) {
      data = new FormData();
      data.append('file', file);
    }

    data.append('username', newPost.username);
    data.append('title', newPost.title);
    data.append('description', newPost.description);
    data.append('category', newPost.category);
    data.append('postDate', newPost.postDate);

    try {
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL + `/posts`, data);
      history.push('/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={css.write}>
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt=""
          className={css.writeImg}
        />
      )}
      <form action="" className={css.writeForm} onSubmit={handleSubmit}>
        <div className={css.writeFormGroup}>
          <label htmlFor="fileInput">
            <i className={`${css.fileIcon} ${'fas fa-plus'}`}></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Tytuł"
            className={css.writeInput}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <SelectCategory value={category} cat={setCategory} />
        <div className={css.writeFormGroup}>
          <textarea
            className={`${css.writeInput} ${css.writeText}`}
            type="text"
            placeholder="Napisz post..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button className={css.writeSubmit} type="submit">
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default Write;
