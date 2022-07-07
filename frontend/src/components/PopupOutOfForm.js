import React from "react";

function PopupOutOfForm(props) {
  return (
    <div
      className={`overlay overlay_form overlay_${props.name} ${
        props.isOpen && "overlay_active"
      }`}
    >
      <div className="tool-tip">
        {props.children}
        <button
          onClick={props.onClose}
          className="popup__close-btn close-btn"
          type="reset"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
}

export default PopupOutOfForm;
