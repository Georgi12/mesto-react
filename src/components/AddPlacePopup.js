
import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [card, setCard] = React.useState({name: '', link: ''})

    const handleInputChange = (e) => {
        setCard({...card, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAddPlace(card)
    }

    return(
        < PopupWithForm
            name={'place'}
            title={'Новое место'}
            submitButton={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <>
                <input
                    id="place-name" type="text" minLength="1" maxLength="30" required onChange={handleInputChange}
                    className="popup__input popup__name" name="name" placeholder="Название"  value={card.name}
                />
                <span className="popup__error" id="place-name-error"></span>
                <input
                    id="place-link" type="url" className="popup__input popup__description" name="link"
                    placeholder="Ссылка на картинку" required onChange={handleInputChange} value={card.link}
                />
                <span className="popup__error" id="place-link-error"></span>
            </>

        </PopupWithForm>
    )
}

export default AddPlacePopup;