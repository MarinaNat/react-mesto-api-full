import React from "react";
import PopupOutOfForm from "./PopupOutOfForm";

const InfoTooltip = ({ img, title, onClose, isOpen }) => {
  return (
    <PopupOutOfForm isOpen={isOpen} onClose={onClose}>
      <img className="tool-tip__image" src={img} alt="icon" />
      <h2 className="tool-tip__title">{title}</h2>
    </PopupOutOfForm>
  );
};

export default InfoTooltip;