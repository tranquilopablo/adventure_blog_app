import React, { useState } from 'react';
import css from './RegisterElements.module.css';

const RegisterElements = () => {
  const [file, setFile] = useState();

  const defaultSrc =
    'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

  return (
    <>
      <label style={{ marginTop: '10px' }}>Zdjęcie profilowe</label>
      <div className={css.settingsPP}>
        <img
          src={file ? URL.createObjectURL(file) : defaultSrc}
          alt="my profile picture"
        />
        {/* <img
                      src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    /> */}
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
      />
    </>
  );
};

export default RegisterElements;
