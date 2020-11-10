import '../index.css';
import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {


    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})

    const handleCardClick = (link, name) => {
        console.log(link, name)
        setSelectedCard({link, name})
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)

    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setSelectedCard({})
    }

  return (
      <div className={"page"}>
        < Header />
        < Main
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
        />
        < Footer />
        < PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            submitButton={'Сохранить'}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            children={
                <>
                    <input
                        id="avatar-link" type="url" className="popup__input popup__description" name="avatar"
                        placeholder="Ссылка на картинку" required
                    />
                    <span className="popup__error" id="avatar-link-error"></span>
                </>

            }
        />
        < PopupWithForm
            name={'fio'}
            title={'Редактировать профиль'}
            submitButton={'Сохранить'}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            children={
                <>
                    <input
                        id="name-input" type="text" minLength="2" maxLength="40" className="popup__input popup__name"
                        name="name" value="" required
                    />
                    <span className="popup__error popup__error_visible" id="name-input-error"></span>
                    <input
                        id="description-input" type="text" minLength="2" maxLength="200"
                        className="popup__input popup__description" name="about" value="" required
                    />
                    <span className="popup__error" id="description-input-error"></span>
                </>
            }
        />
        < PopupWithForm
            name={'place'}
            title={'Новое место'}
            submitButton={'Сохранить'}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            children={
                <>
                    <input
                        id="place-name" type="text" minLength="1" maxLength="30"
                        className="popup__input popup__name" name="name" placeholder="Название" required
                    />
                    <span className="popup__error" id="place-name-error"></span>
                    <input
                        id="place-link" type="url" className="popup__input popup__description" name="link"
                        placeholder="Ссылка на картинку" required
                    />
                    <span className="popup__error" id="place-link-error"></span>
                </>
            }
        />
        < PopupWithForm
            name={'delete'}
            title={'Вы уверены'}
            submitButton={'Да'}
            isOpen={false}
            onClose={closeAllPopups}
        />

        < PopupWithForm
            name={'error'}
            title={'Пролизошла ошибка'}
            submitButton={'Ok'}
            isOpen={false}
            onClose={closeAllPopups}
        />

        < ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
        />
      </div>
  );
}

export default App;
