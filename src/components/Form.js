import React from 'react';

function Form({name, onSubmit, title, children, submitButton, onClose}) {
    return(
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
            {onClose && <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={onClose}/>}
            <h2 className="popup__title">
                {title}
            </h2>
            {children}
            <button type="submit" className="popup__button">{submitButton}</button>
        </form>
    )
}

export default Form;
