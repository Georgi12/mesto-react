import React from 'react';
import Card from './Card';
import {CurrentUserContext} from "../contexts/currentUserContexts"
import {CardContext} from "../contexts/CardContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

    const cards  = React.useContext(CardContext)
    const currentUser = React.useContext(CurrentUserContext)

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