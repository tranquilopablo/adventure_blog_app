import React, { useContext, useState } from 'react';
import css from './Settings.module.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Context } from '../context/Context';
import Modal from '../shared/uiElements/Modal';

const Settings = () => {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const picturePath = 'http://localhost:5000/images/';

  const openConfirmationDialog = () => {
    setIsOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: 'UPDATE_START' });
    const updatedUser = {
      userId: user._id,
      username,
      password,
      email,
    };

    const data = new FormData();
    if (file) {
      // const filename = Date.now() + file.name;
      // data.append('name', filename);
      data.append('file', file);
      // updatedUser.profilePic = filename;

      //   try {
      //     await axios.post('/upload', data);
      //   } catch (err) {
      //   }
    }

    data.append('userId', updatedUser.userId);
    data.append('username', updatedUser.username);
    data.append('password', updatedUser.password);
    data.append('email', updatedUser.email);

    try {
      const res = await axios.put(process.env.REACT_APP_BACKEND_URL + `/users/${user._id}`, data);
      setSuccess(true);

      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete(process.env.REACT_APP_BACKEND_URL + `/users/${user._id}`, {
        data: { userId: user._id },
      });
      if (res.data) {
        setTimeout(() => {
          dispatch({ type: 'LOGOUT' });
        }, 500);
      }
    } catch (err) {}
    setIsOpenModal(false);
  };

  // const defaultSrc =
  //   'https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

  return (
    <div className={css.settings}>
      {isOpenModal && (
        <Modal
          setIsOpen={setIsOpenModal}
          title="Potwierdź"
          content="Potwierdzasz chęć usunięcia konta?"
          confirm={handleDeleteAccount}
        />
      )}
      <div className={css.settingsWrapper}>
        <div className={css.settingsTitle}>
          <span className={css.settingsTitleUpdate}>Edytuj swoje konto</span>
          <span
            className={css.settingsTitleDelete}
            onClick={openConfirmationDialog}
          >
            Usuń konto
          </span>
        </div>
        <form className={css.settingsForm} onSubmit={handleSubmit}>
          <label>Zdjęcie profilowe</label>
          <div className={css.settingsPP}>
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt="me"
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
      <Sidebar extrastyles />
    </div>
  );
};

export default Settings;
