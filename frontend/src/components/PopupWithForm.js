import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`overlay overlay_form overlay_${props.name} ${
        props.isOpen && "overlay_active"
      }`}
      id="popup_profile"
    >
      <form
        onSubmit={props.onSubmit}
        name={props.name}
        className="popup popup_profile popup_form"
      >
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__info">{props.children}</fieldset>
        <button className="popup__save-btn" type="submit">
          {props.buttonText}
        </button>
        <button
          onClick={props.onClose}
          className="popup__close-btn close-btn"
          type="button"
          aria-label="Закрыть"
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
