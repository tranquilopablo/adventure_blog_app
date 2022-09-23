import React, { useContext, useState } from 'react';
import css from './Settings.module.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Context } from '../context/Context';

const Settings = () => {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const picturePath = 'http://localhost:5000/images/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      password,
      email,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;

      // try {
      //   await axios.post('/upload', data);
      // } catch (err) {
      //   console.log(err);
      // }
    }
    console.log(updatedUser);

    // try {
    //   const res = await axios.put('/users/' + user._id, updatedUser);
    //   setSuccess(true);
    //   dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    // } catch (err) {
    //   dispatch({ type: 'UPDATE_FAILURE' });
    //   console.log(err);
    // }
  };

  const handleDeleteAccount = () => {
    console.log('usunales konto!');
  };

  // const defaultSrc =
  //   'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

  return (
    <div className={css.settings}>
      <div className={css.settingsWrapper}>
        <div className={css.settingsTitle}>
          <span className={css.settingsTitleUpdate}>Edytuj swoje konto</span>
          <span
            className={css.settingsTitleDelete}
            onClick={handleDeleteAccount}
          >
            Usuń konto
          </span>
        </div>
        <form className={css.settingsForm} onSubmit={handleSubmit}>
          <label>Zdjęcie profilowe</label>
          <div className={css.settingsPP}>
            <img
              src={
                file ? URL.createObjectURL(file) : picturePath + user.profilePic
              }
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
          <input
            type="text"
            placeholder={user.username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Hasło</label>
          <input
            type="password"
            placeholder="Podaj nowe hasło"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={css.settingsSubmitButton} type="submit">
            Zaktualizuj
          </button>
          {success && (
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
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
