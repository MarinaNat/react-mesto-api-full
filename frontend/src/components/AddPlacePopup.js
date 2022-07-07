import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        id="element-name"
        type="text"
        name="elementName"
        placeholder="Название"
        className="popup__input popup__element popup__element_type_name"
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="30"
        value={name || ""}
      />
      <span id="element-name-error" className="error"></span>
      <input
        id="element-link"
        type="url"
        name="elementLink"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        className="popup__input popup__element popup__element_type_link"
        required
        value={link || ""}
      />
      <span id="element-link-error" className="error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
