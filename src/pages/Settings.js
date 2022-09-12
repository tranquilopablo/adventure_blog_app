import React, { useState } from 'react';
import css from './Settings.module.css';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [file, setFile] = useState();
  const defaultSrc =
    'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
  return (
    <div className={css.settings}>
      <div className={css.settingsWrapper}>
        <div className={css.settingsTitle}>
          <span className={css.settingsTitleUpdate}>Edytuj swoje konto</span>
          <span className={css.settingsTitleDelete}>Usuń konto</span>
        </div>
        <form className={css.settingsForm}>
          <label>Zdjęcie profilowe</label>
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
              <i
                className={`${css.settingsPPIcon} ${'far fa-user-circle'} `}
              ></i>
            </label>
            <input
              className={css.settingsPPInput}
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Nazwa użytkownika</label>
          <input type="text" placeholder="Pawel Zguda" name="name" />
          <label>Email</label>
          <input type="email" placeholder="Email" name="email" />
          <label>Hasło</label>
          <input type="password" placeholder="Hasło" name="password" />
          <button className={css.settingsSubmitButton} type="submit">
            Zaktualizuj
          </button>
          <span
            style={{
              color: 'green',
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '1.3rem',
            }}
          >
            Profil został zaktualizowany
          </span>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
