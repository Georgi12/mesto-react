
import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {currentUserContext} from "../contexts/currentUserContexts";

function EditAvatarPopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = React.useContext(currentUserContext);
    const [avatar, setAvatar] = React.useState('');

    const handleInputChange = (e) => {
        setAvatar(e.target.value)
    }
    React.useEffect(() => {
        setAvatar(currentUser.avatar)
    }, [currentUser]);
    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateUser({avatar: avatar})
    }

    return(
        < PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            submitButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input
                    id="avatar-link" type="url" className="popup__input popup__description" name="avatar"
                    placeholder="Ссылка на картинку" required onChange={handleInputChange}
                />
                <span className="popup__error" id="avatar-link-error"></span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;