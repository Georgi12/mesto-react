
import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.createRef()
    const handleInputChange = (e) => {
        avatarRef.current.value = e.target.value
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen, avatarRef])

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdateAvatar({avatar: avatarRef.current.value})
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
                    placeholder="Ссылка на картинку" required onChange={handleInputChange} ref={avatarRef}
                />
                <span className="popup__error" id="avatar-link-error"></span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;