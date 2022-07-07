import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <article
      className={`overlay overlay_picture overlay_image ${
        card.link && "overlay_active"
      }`}
      id="overlay_image"
    >
      <div className="full-screen">
        <img
          className="full-screen__image"
          data-type="auto"
          src={card.link}
          alt={card.name}
        />
        <h2 className="full-screen__title full-screen__title_image">
          {card.name}
        </h2>
        <button
          className="full-screen__close-btn close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </article>
  );
}

export default ImagePopup;
