import '../index.css';
import React  from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api, authApi} from "../utils/api";
import {CurrentUserContext} from "../contexts/currentUserContexts"
import {CardContext} from "../contexts/CardContext"
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ErrorKeeperPopup from './ErrorKeeperPopup';
import Login from "./Login";
import Register from "./Register";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isErrorPopupOpen, setIsErrorPopupOpen] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''})
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [headerEmail, setHeaderEmail] = React.useState('')
    const history = useHistory()


    React.useEffect( () => {
        handleTokenCheck()
    },[])

    React.useEffect(() => {
        if (!loggedIn) return
        Promise.all(
            [api.getProfileInfo(),api.getCards()]
        ).then(([updatedUser, initialCards]) => {
                setCurrentUser(updatedUser)
                setCards(initialCards);
            }
        ).catch(err => {
            errorHandler(err)
        })
    }, [loggedIn])

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

    const handleSignOut = () => {
        localStorage.removeItem('jwt')
        setHeaderEmail('')
        setLoggedIn(false)
        history.push('/sign-in')
    }


    const handleLogin = () => {
        setLoggedIn(true)
    }

    const handleTokenCheck = () => {
        if (localStorage.getItem('jwt')){
            let jwt = localStorage.getItem('jwt')
            authApi.checkToken(jwt)
                .then((res) => {
                    if(res) {
                        setLoggedIn(true)
                        setHeaderEmail(res.data.email)
                        history.push('/')
                    }
                })
                .catch(err => {
                    errorHandler(err)
                });
        }
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

                < Header headerEmail={headerEmail} signOut={handleSignOut}/>
                <Switch>
                    <Route path='/sign-in'>
                        <Login errorHandler={errorHandler} handleLogin={handleLogin}/>
                    </Route>
                    <Route path='/sign-up'>
                        <Register errorHandler={errorHandler} />
                    </Route>
                        <ProtectedRoute
                            path="/"
                            Component={Main}
                            loggedIn={loggedIn}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onEditProfile={handleEditProfileClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                </Switch>
                < Footer />

                < EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                < EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateUserAvatar}
                />

                < AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                < ErrorKeeperPopup
                    isOpen={isErrorPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleErrorSubmit}
                />

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
