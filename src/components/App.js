import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import {currentUserContext} from "../contexts/currentUserContexts"
import {cardContext} from "../contexts/CardContext"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';


function App() {
    React.useEffect(() => {
        document.body.classList.add('page')
    },[])

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''})
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        Promise.all(
            [api.getProfileInfo(),api.getCards()]
        ).then(([{name, about, avatar, _id}, initialCards]) => {
                setCurrentUser({name: name, about: about, avatar: avatar, _id: _id})
                setCards( initialCards.map((card => ({
                    _id: card._id,
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    owner: card.owner
                })))
            );
            }
        )
    }, [])

    const handleUpdateUser = (value) => {
        api.setProfileInfo(value).then((newCurrentUser) => {
            setCurrentUser(newCurrentUser)
            closeAllPopups()
        })
    }

    const handleUpdateUserAvatar = (value) => {
        api.setAvatarInfo(value).then((newCurrentUser) => {
            setCurrentUser(newCurrentUser)
            closeAllPopups()
        })
    }
    const handleCardClick = ({name, link}) => {
        setSelectedCard({name, link})
    }

    const handleCardDelete = (card) => {
        const isOwn = card.owner._id === currentUser._id;
        if(isOwn) {
            api.delCard(card._id).then(() => {
                const newCards = cards.filter(delCard => delCard._id !==  card._id)
                setCards(newCards)
            })
        }

    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.apiLike(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard);
            setCards(newCards);
        });
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
        <>
            <cardContext.Provider value={cards}>
            <currentUserContext.Provider value={currentUser}>
                < Header />
                < Main
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                < Footer />

                < EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                   onUpdateUser={handleUpdateUser}
                />

                < EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                   onUpdateUser={handleUpdateUserAvatar}
                />

                < PopupWithForm
                    name={'place'}
                    title={'Новое место'}
                    submitButton={'Сохранить'}
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
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

                </PopupWithForm>

                < ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
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
            </currentUserContext.Provider>
            </cardContext.Provider>
        </>
    );
}

export default App;
