



function PopupWithForm(props) {

    return(
        <div className="popup popup_avatar">
            <form className="popup__form" name="avatar-popup" noValidate>
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <h2 className="popup__title">Обновить аватар</h2>
                <input id="avatar-link" type="url" className="popup__input popup__avatar" name="avatar" placeholder="Ссылка на картинку" required/>
                <span className="popup__error" id="avatar-link-error"></span>
                <button type="submit" className="popup__button">Сохранить</button>
            </form>
        </div>
    )
}

export default PopupWithForm