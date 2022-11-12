import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterElements from '../components/RegisterElements';
import css from './Login.module.css';
import axios from 'axios';
import { Context } from '../context/Context';

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, error } = useContext(Context);
  const [emailValue, setEmailValue] = useState('');
  const [imageInput, setImageInput] = useState(null);
  const history = useHistory();
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    if (loginMode) {
      // LOGIN
      try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + `/auth/login`, {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        res.data && history.push('/');
      } catch (err) {
        setErr(true);
        dispatch({ type: 'LOGIN_FAILURE' });
        console.log(err);
      }
    } else {
      // REGISTER
      try {
        const newUser = {
          username: userRef.current.value,
          password: passwordRef.current.value,
          email: emailValue,
        }; 
        let data
        if (imageInput) {
           data = new FormData();
          data.append('file', imageInput);
        }
        data.append("username", newUser.username)
        data.append("password", newUser.password)
        data.append("email", newUser.email)
        try {
          const res = await axios.post(process.env.REACT_APP_BACKEND_URL + `/auth/register`, data);
          dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
          res.data && history.push('/');
        } catch (err) {
          dispatch({ type: 'LOGIN_FAILURE' });
          setErr(error);
        }
      } catch (err) {
        dispatch({ type: 'LOGIN_FAILURE' });
        setErr(error);
      }
    }
  };

  const modeSwitch = () => {
    setLoginMode(!loginMode);
    setErr(false);
  };

  return (
    <div className={`${css.login} ${loginMode && css.register}`}>
      <span className={css.loginTitle}>
        {loginMode ? 'Login' : 'Rejestracja'}
      </span>
      <form className={css.loginForm} onSubmit={handleSubmit}>
        <label>Nazwa użytkownika</label>
        <input
          autoFocus
          type="text"
          className={css.loginInput}
          placeholder="Podaj nazwę użytkownika"
          ref={userRef}
        />
        {!loginMode && (
          <RegisterElements
            setEmailValue={setEmailValue}
            setImageInput={setImageInput}
          />
        )}
        <label>Hasło</label>
        <input
          type="password"
          placeholder="Podaj hasło"
          className={css.loginInput}
          ref={passwordRef}
        />
        <button type="submit" className={css.loginButton} disabled={isFetching}>
          {!loginMode ? 'Zarejestruj' : 'Zaloguj'}
        </button>
      </form>
      <button onClick={modeSwitch} className={css.loginRegisterButton}>
        {loginMode ? 'Rejestracja' : 'Logowanie'}
      </button>
      {err && (
        <span style={{ color: 'red', marginTop: '15px', fontSize: '1.4rem' }}>
          Coś poszło nie tak! Sprawdż poprawność danych.
        </span>
      )}
    </div>
  );
};

export default Login;
