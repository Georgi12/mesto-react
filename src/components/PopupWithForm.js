import React from 'react';
import Form from "./Form";

function PopupWithForm({title, name, submitButton, isOpen, onClose, onSubmit, children}) {
    return(
        <div className={`popup popup_${name} ${isOpen ? "popup_display-on" : ""}`}>
            <Form
                name={name}
                onSubmit={onSubmit}
                title={title}
                children={children}
                submitButton={submitButton}
                onClose={onClose}
            />
        </div>
    )
}

export default PopupWithForm
