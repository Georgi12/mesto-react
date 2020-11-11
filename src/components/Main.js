import React from 'react';
import api from '../utils/Api'
import Card from './Card';
import cardSorting from '../utils/utils';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
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
                initialCards.sort((a, b) => cardSorting(a, b))
                setCards( initialCards.map((card => ({
                        id: card._id,
                        name: card.name,
                        link: card.link,
                        likes: card.likes
                    })))
                );
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
                {
                    cards.map(({id, ...props}) =>
                        < Card key={id} {...props} onCardClick={onCardClick}/>
                        )
                }
            </section>
        </main>
    )
}

export default Main;