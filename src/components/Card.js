import React from 'react';
import {currentUserContext} from "../contexts/currentUserContexts";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(currentUserContext);
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const ownCard = card.owner._id === currentUser._id;
    const deleteButtonClassName = `element__delete ${ownCard ? "element__delete_active": ""}`;
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element_active-like': ''}`;
    function handleLikeClick(card) {
        onCardLike(card)
    }
    function handleCardDelete(card) {
        onCardDelete(card)
    }
    return(
        <article className="element">
            <button type="button" className={deleteButtonClassName} onClick={() => handleCardDelete(card)}/>
            <img className="element__image" src={`${card.link}`} alt={card.name}  onClick={() => onCardClick(card)}/>
            <div className="element__description">
                <h2 className="element__caption">{card.name}</h2>
                <div className="element__like-wrapper">
                    <button type="button" className={cardLikeButtonClassName} onClick={() => handleLikeClick(card)}/>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;