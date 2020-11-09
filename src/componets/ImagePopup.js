import React from 'react';

function ImagePopup() {
    return(
        <div className="popup popup_photo-position">
            <div className="popup__figure">
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <img className="popup__image" src="#" alt=""/>
                <h2 className="popup__photo-title"></h2>
            </div>
        </div>
    )
}

export default ImagePopup