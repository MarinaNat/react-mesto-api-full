import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [state, setState] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("in Register-handleSubmit", state);
    if (onRegister && state.email && state.password) {
      onRegister(state.email, state.password);
    }
    // здесь обработчик регистрации
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="register__input"
          required
          id="email"
          name="email"
          type="email"
          value={state.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />
        <span id="register-email-error" className="error"></span>
        <input
          className="register__input"
          required
          id="password"
          name="password"
          type="password"
          value={state.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
          autoComplete="on"
        />
        <span id="register-password-error" className="error"></span>

        <button type="submit" className="register__button-container">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <Link to="/signin" className="register__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
