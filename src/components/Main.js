import React from 'react';
import Card from './Card';
import {currentUserContext} from "../contexts/currentUserContexts"
import {cardContext} from "../contexts/CardContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const cards  = React.useContext(cardContext)
    const currentUser = React.useContext(currentUserContext)

    return(
        <main className="main">
            <section className="profile">
                <div
                    className="profile__avatar"
                    onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}/>
            </section>

            <section className="elements">
                {
                    cards.map((card) =>
                        < Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                        )
                }
            </section>
        </main>
    )
}

export default Main;