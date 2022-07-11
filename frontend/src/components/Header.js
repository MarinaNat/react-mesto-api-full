import React from "react";
import { useLocation, Link } from "react-router-dom";
import headerLogo from "./../images/logo.svg";

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <a className="header__link" href="/">
        <img className="logo" src={headerLogo} alt="Логотипп" />
      </a>
      {location.pathname === "/" && (
        <div className="header__contener">
          <p className="header__user-email">{email}</p>
          <Link className="header__button" to="/signin" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      )}
      {location.pathname === "/signup" && (
        <div className="header__contener">
          <Link className="header__button" to="/signin">
            Войти
          </Link>
        </div>
      )}
      {location.pathname === "/signin" && (
        <div className="header__contener">
          <Link className="header__button" to="/signup">
            Регистрация
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;