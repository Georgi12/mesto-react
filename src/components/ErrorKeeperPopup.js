import PopupWithForm from "./PopupWithForm";
import React from "react";

function ErrorKeeperPopup ({isOpen, onClose, onSubmit}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    return(
        < PopupWithForm
            name={'error'}
            title={'Пролизошла ошибка'}
            submitButton={'Ok'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default ErrorKeeperPopup