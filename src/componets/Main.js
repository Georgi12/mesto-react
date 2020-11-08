function Main() {
    function handleEditAvatarClick() {
        const popup = document.querySelector(".popup_avatar");
        popup.classList.add("popup_display-on");
    }

    function handleEditProfileClick() {
        const popup = document.querySelector(".popup_fio");
        popup.classList.add("popup_display-on");
    }

    function handleAddPlaceClick() {
        const popup = document.querySelector(".popup_place");
        popup.classList.add("popup_display-on");
    }

    return(
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={handleEditAvatarClick}></div>
                <div className="profile__info">
                    <h1 className="profile__name"></h1>
                    <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
                    <p className="profile__description"></p>
                </div>
                <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}></button>
            </section>

            <section className="elements">

            </section>
        </main>
    )
}

export default Main;