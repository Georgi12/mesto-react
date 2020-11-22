import '../index.css';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/currentUserContexts"
import {CardContext} from "../contexts/CardContext"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ErrorKeeperPopup from './ErrorKeeperPopup';


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''})
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        Promise.all(
            [api.getProfileInfo(),api.getCards()]
        ).then(([updatedUser, initialCards]) => {
                setCurrentUser(updatedUser)
                setCards(initialCards);
            }
        ).catch(err => {
            errorHandler(err)
        })
    }, [])

    const handleUpdateUser = (value) => {
        api.setProfileInfo(value).then((newCurrentUser) => {
            setCurrentUser(newCurrentUser)
            closeAllPopups()
        }).catch(err => {
            errorHandler(err)
        })
    }

    const handleUpdateUserAvatar = (value) => {
        api.setAvatarInfo(value).then((newCurrentUser) => {
            setCurrentUser(newCurrentUser)
            closeAllPopups()
        }).catch(err => {
            errorHandler(err)
        })
    }
    const handleAddPlaceSubmit = (card) => {
        api.setCard(card).then((newCard) => {
            setCards([newCard, ...cards])
            closeAllPopups()
        }).catch(err => {
            errorHandler(err)
        })
    }
    const handleErrorSubmit = () => {
        closeAllPopups()
    }

    const errorHandler = (err) => {
        closeAllPopups()
        console.log(err)
        handleErrorOpen()
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
            }).catch(err => {
                errorHandler(err)
            })
        }

    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.apiLike(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard);
            setCards(newCards);
        }).catch(err => {
            errorHandler(err)
        });
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)

    }

    const handleErrorOpen = () => {
        setIsErrorPopupOpen(true)

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
        setIsErrorPopupOpen(false)
        setSelectedCard({})
    }


    return (
        <>
            <CardContext.Provider value={cards}>
            <CurrentUserContext.Provider value={currentUser}>
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
                                  onUpdateAvatar={handleUpdateUserAvatar}
                />
                < AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                                  onAddPlace={handleAddPlaceSubmit}
                />

                < ErrorKeeperPopup isOpen={isErrorPopupOpen} onClose={closeAllPopups} onSubmit={handleErrorSubmit}/>

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

            </CurrentUserContext.Provider>
            </CardContext.Provider>
        </>
    );
}

export default App;
