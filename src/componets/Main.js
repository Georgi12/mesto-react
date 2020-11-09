import React from 'react';
import api from '../utils/Api'

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    React.useEffect(() =>{
        Promise.all([
            api.getProfileInfo(),
            api.getCards(),
        ])
            .then(([{name, about, avatar}, initialCards]) => {
                setUserName(name)
                setUserDescription(about)
                setUserAvatar(avatar)

                const mewCards = initialCards.map((card) =>
                    <article className="element">
                        <button type="button" className="element__delete" disabled/>
                        <img className="element__image" src={`${card.link}`} alt={card.name}/>
                        <div className="element__description">
                            <h2 className="element__caption">{card.name}</h2>
                            <div className="element__like-wrapper">
                                <button type="button" className="element__like"/>
                                <p className="element__like-count">{card.likes.length}</p>
                            </div>
                        </div>
                    </article>
                )

                setCards([...cards, ...mewCards])
            })
            .catch((err) => {
                console.log(err);
            });
    },[])




    return(
        <main className="main">
            <section className="profile">
                <div
                    className="profile__avatar"
                    onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${userAvatar})` }}
                />
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}/>
            </section>

            <section className="elements">
                {cards}
            </section>
        </main>
    )
}

export default Main;