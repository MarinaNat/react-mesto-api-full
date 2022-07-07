import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="user-name"
        type="text"
        name="userName"
        onChange={handleNameChange}
        value={name || ""}
        className="popup__input popup__user popup__user_type_name"
        required
        minLength="2"
        maxLength="40"
      />
      <span id="user-name-error" className="error"></span>
      <input
        id="user-status"
        type="text"
        name="userStatus"
        onChange={handleDescriptionChange}
        value={description || ""}
        className="popup__input popup__user popup__user_type_status"
        required
        minLength="2"
        maxLength="200"
      />
      <span id="user-status-error" className="error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
