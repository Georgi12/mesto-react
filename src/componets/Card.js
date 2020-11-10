import React from 'react';

function Card({name, link, likes, onCardClick}) {
    return(
        <article className="element">
            <button type="button" className="element__delete" disabled/>
            <img className="element__image" src={`${link}`} alt={name}  onClick={(name, link) => onCardClick(name, link)}/>
            <div className="element__description">
                <h2 className="element__caption">{name}</h2>
                <div className="element__like-wrapper">
                    <button type="button" className="element__like"/>
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card