import React from 'react';

function ImagePopup(props) {
    const ifClosePopup = () => {
        return (props.card.link && props.card.name)
    }
    return(

        <div className={`popup popup_photo-position ${ifClosePopup() ? "popup_display-on" : ""}`}>
            <div className="popup__figure">
                <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={props.onClose}/>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <h2 className="popup__photo-title">
                    {props.card.name}
                </h2>
            </div>
        </div>
    )
}

export default ImagePopup