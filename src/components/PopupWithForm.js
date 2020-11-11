import React from 'react';

function PopupWithForm({title, name, submitButton, isOpen, onClose, children}) {

    return(
        <div className={`popup popup_${name} ${isOpen ? "popup_display-on" : ""}`}>
            <form className="popup__form" name={name} noValidate>
                <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={onClose}/>
                <h2 className="popup__title">
                    {title}
                </h2>
                {children}
                <button type="submit" className="popup__button">{submitButton}</button>
            </form>
        </div>
    )
}

export default PopupWithForm