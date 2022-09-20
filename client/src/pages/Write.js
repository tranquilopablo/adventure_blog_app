import React, { useContext, useState } from 'react';
import SelectCategory from '../components/SelectCategory';
import { Context } from '../context/Context';
import axios from 'axios';
import css from './Write.module.css';


const Write = () => {
  const [file, setFile] = useState();
  const { user } = useContext(Context);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")



  const handleSubmit = (e) => {
    e.preventSefault()


  }

  return (
    <div className={css.write}>
      {file && (
        <img
          //   src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          src={URL.createObjectURL(file)}
          alt=""
          className={css.writeImg}
        />
      )}
      <form action="" className={css.writeForm} onSubmit={handleSubmit} >
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
          />
        </div>
        <SelectCategory />
        <div className={css.writeFormGroup}>
          <textarea
            className={`${css.writeInput} ${css.writeText}`}
            type="text"
            placeholder="Napisz post..."
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
