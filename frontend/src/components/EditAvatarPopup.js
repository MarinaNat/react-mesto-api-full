import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const editAvatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную
  
  React.useEffect(() => {
    editAvatarRef.current.value = '';
  }, [isOpen])
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: editAvatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={editAvatarRef} // указали элементу атрибут ref => получили прямой доступ к DOM-элементу
        id="avatar"
        type="url"
        name="userAvatar"
        className="popup__input popup__avatar"
        required
      />
      <span id="avatar-error" className="error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup