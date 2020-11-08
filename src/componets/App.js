import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";

function App() {
  return (
      <body className="page">
        < Header />
        < Main />
        < Footer />
        < PopupWithForm />

        {/*<div className="popup popup_avatar">*/}
        {/*    <form className="popup__form" name="avatar-popup" noValidate>*/}
        {/*        <button type="button" className="popup__close" aria-label="Закрыть попап"></button>*/}
        {/*        <h2 className="popup__title">Обновить аватар</h2>*/}
        {/*        <input id="avatar-link" type="url" className="popup__input popup__description" name="avatar"*/}
        {/*             placeholder="Ссылка на картинку" required/>*/}
        {/*        <span className="popup__error" id="avatar-link-error"></span>*/}
        {/*        <button type="submit" className="popup__button">Сохранить</button>*/}
        {/*    </form>*/}
        {/*</div>*/}

        <div className="popup popup_fio">
            <form className="popup__form" name="fio-popup" noValidate>
              <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
              <h2 className="popup__title">Редактировать профиль</h2>
              <input id="name-input" type="text" minLength="2" maxLength="40" className="popup__input popup__name" name="name" value="" required/>
              <span className="popup__error popup__error_visible" id="name-input-error"></span>
              <input id="description-input" type="text" minLength="2" maxLength="200" className="popup__input popup__description" name="about" value="" required/>
              <span className="popup__error" id="description-input-error"></span>
              <button type="submit" className="popup__button">Сохранить</button>
            </form>
        </div>

        <div className="popup popup_place">
            <form className="popup__form" name="place-popup" noValidate>
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <h2 className="popup__title">Новое место</h2>
                <input id="place-name" type="text" minLength="1" maxLength="30" className="popup__input popup__name" name="name" placeholder="Название" required/>
                <span className="popup__error" id="place-name-error"></span>
                <input id="place-link" type="url" className="popup__input popup__description" name="link" placeholder="Ссылка на картинку" required/>
                <span className="popup__error" id="place-link-error"></span>
                <button type="submit" className="popup__button">Сохранить</button>
            </form>
        </div>

        <div className="popup popup_photo-position">
            <div className="popup__figure">
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <img className="popup__image" src="#" alt=""/>
                <h2 className="popup__photo-title"></h2>
            </div>
        </div>

        <div className="popup popup_delete">
            <form className="popup__form" name="place-popup" noValidate>
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <h2 className="popup__title">Вы уверены?</h2>
                <button type="submit" className="popup__button">Да</button>
            </form>
        </div>

        <div className="popup popup_error">
            <form className="popup__form" name="place-popup" noValidate>
                <button type="button" className="popup__close" aria-label="Закрыть попап"></button>
                <h2 className="popup__title">Пролизошла ошибка</h2>
                <button type="submit" className="popup__button">Да</button>
            </form>
        </div>


        <template id="element-template">
        <article className="element">
          <button type="button" className="element__delete" disabled></button>
          <img className="element__image" src="#" alt=""/>
            <div className="element__description">
              <h2 className="element__caption"></h2>
              <div className="element__like-wrapper">
                <button type="button" className="element__like"></button>
                <p className="element__like-count"></p>
              </div>
            </div>
        </article>
        </template>
      </body>
  );
}

export default App;
