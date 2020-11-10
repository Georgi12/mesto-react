import React from 'react';

function ImagePopup(card, onClose) {
    console.log(card)
    return(

        <div className={`popup popup_photo-position ${!card ? "popup_display-on" : ""}`}>
            <div className="popup__figure">
                <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={onClose}/>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <h2 className="popup__photo-title">{card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup