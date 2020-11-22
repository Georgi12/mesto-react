import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/currentUserContexts";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(CurrentUserContext);
    const [value, setValue] = React.useState({name: '', about: ''});

    const handleInputChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }
    React.useEffect(() => {
        setValue({name: currentUser.name, about: currentUser.about})
    }, [currentUser]);
    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateUser(value)
    }

    return(
        < PopupWithForm
            name={'fio'}
            title={'Редактировать профиль'}
            submitButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input
                    id="name-input" type="text" minLength="2" maxLength="40" className="popup__input popup__name"
                    name="name" required value={value.name} onChange={handleInputChange}
                />
                <span className="popup__error popup__error_visible" id="name-input-error"></span>
                <input
                    id="description-input" type="text" minLength="2" maxLength="200" onChange={handleInputChange}
                    className="popup__input popup__description" name="about"  required value={value.about}
                />
                <span className="popup__error" id="description-input-error"></span>
            </>

        </PopupWithForm>
    )
}

export default EditProfilePopup;