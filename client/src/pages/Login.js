import React, { useState, useRef, useContext } from 'react';
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
  const [imageInput, setImageInput] = useState('');

  // const isFetching = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      if (loginMode) {
        //zaloguj

        console.log(userRef.current.value, passwordRef.current.value);

        const res = await axios.post('/auth/login', {
          username: userRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        console.log('Zalogowano');
      } else {
        //zarejestruj
        console.log(
          userRef.current.value,
          passwordRef.current.value,
          emailValue,
          imageInput
        );

        const res = await axios.post('/auth/register', {
          username: userRef.current.value,
          password: passwordRef.current.value,
          email: emailValue,
          image: imageInput,
        });
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        console.log('zarejestrowano');
        console.log(res.data);
        res.data && window.location.replace('/login');
      }
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
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
      <button
        onClick={() => setLoginMode(!loginMode)}
        className={css.loginRegisterButton}
      >
        {loginMode ? 'Rejestracja' : 'Logowanie'}
      </button>
      {error && (
        <span style={{ color: 'red', marginTop: '15px', fontSize: '1.4rem' }}>
          Coś poszło nie tak! Sprawdż poprawność danych.
        </span>
      )}
    </div>
  );
};

export default Login;
