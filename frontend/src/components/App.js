import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import unionOk from "../images/unionOk.svg";
import unionFalse from "../images/unionFalse.svg";

import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [tooltipData, setTooltipData] = useState({ img: "", title: "" });
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCard()])
        .then(([data, cards]) => {
          console.log(data)
          setCurrentUser('data: ', data);
          setCards(cards);
        }) // тут ловим ошибку
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    console.log("in app-checkToken:", token);
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            console.log("in app-checkToken-then:", res);
            setEmail(res.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }

  function handleRegister(email, password) {
    console.log("in app-register1", email, password);
    auth
      .register(email, password)
      .then((res) => {
        console.log("in app-register-then", res);
        setTooltipData({
          img: unionOk,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/signin");
      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    console.log("in handleLogin:", email, password);
    auth
      .authorize(email, password)
      .then((res) => {
        console.log("in handleLogin-authorize:", res.token);
        localStorage.setItem("token", res.token);
      })
      .then(() => {
        checkToken();
      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setIsInfoTooltipOpen(true);
      });
  }

  const onSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onSignOut={onSignOut} email={email} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          ></Route>

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <InfoTooltip
          name="InfoTooltip"
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          title={tooltipData.title}
          img={tooltipData.img}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;