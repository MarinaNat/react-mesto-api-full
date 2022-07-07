import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="element">
      <button
        className={`${
          isOwn ? "element__delete-btn" : "element__delete-btn_hidden"
        }`}
        type="button"
        aria-label="Кнопка удаления"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__container">
        <img
          className="element__foto"
          data-type="auto"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="element__info">
        <h2 className="element__text">{card.name}</h2>
        <div className="like like_contener">
          <button
            className={`like__btn element__like ${
              isLiked ? "element__like_active" : ""
            }`}
            type="button"
            aria-label="Лайк"
            onClick={handleLike}
          ></button>
          <span className="like__counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
