import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-contener">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            type="button"
            className="profile__avatar-btn"
            onClick={onEditAvatar}
            aria-label="Редактировать аватар"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <p className="profile__user-status">{currentUser.about}</p>
          <button
            className="profile__button-edit"
            type="button"
            aria-label="редактирование профиля"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__button-add"
          type="button"
          aria-label="Добавить фотографию"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.length > 0 && cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
