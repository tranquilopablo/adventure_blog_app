import React, { useEffect, useState } from 'react';
import css from './RegisterElements.module.css';

const RegisterElements = (props) => {
  const [file, setFile] = useState(null);
 const setImageInput = props.setImageInput;

  useEffect(() => {
    setImageInput(file);
  }, [file, setImageInput]);

  const defaultSrc =
    'https://images.unsplash.com/photo-1634896941598-b6b500a502a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=456&q=80';

  return (
    <>
      <label style={{ marginTop: '10px' }}>Zdjęcie profilowe</label>
      <div className={css.settingsPP}>
        <img
          src={file ? URL.createObjectURL(file) : defaultSrc}
          alt="my profile picture"
        />
        <label htmlFor="fileInput">
          <i className={`${css.settingsPPIcon} ${'far fa-user-circle'} `}></i>
        </label>
        <input
          className={css.settingsPPInput}
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <label>Email</label>
      <input
        type="email"
        className={css.loginInput}
        placeholder="Podaj email"
        onChange={(e) => props.setEmailValue(e.target.value)}
      />
    </>
  );
};

export default RegisterElements;
