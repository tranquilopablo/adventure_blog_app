import React, { useState } from 'react';
import RegisterElements from '../components/RegisterElements';
import css from './Login.module.css';

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);

  const isFetching = false;

  return (
    <div className={`${css.login} ${loginMode && css.register}`}>
      <span className={css.loginTitle}>
        {loginMode ? 'Login' : 'Rejestracja'}
      </span>
      <form className={css.loginForm}>
        <label>Nazwa użytkownika</label>
        <input
          autoFocus
          type="text"
          className={css.loginInput}
          placeholder="Podaj nazwę użytkownika"
        />
        {!loginMode && <RegisterElements />}
        <label>Hasło</label>
        <input
          type="password"
          placeholder="Podaj hasło"
          className={css.loginInput}
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
    </div>
  );
};

export default Login;
