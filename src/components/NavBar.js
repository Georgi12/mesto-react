import React from 'react'
import {NavLink} from "react-router-dom";

function NavBar({signOut}) {
    return (
        <nav className="menu">
            <NavLink className="menu__item" activeClassName="menu__item_active" to="/sign-in">Войти</NavLink>
            <NavLink className="menu__item" activeClassName="menu__item_active" to="/sign-up">Регистрация</NavLink>
            <NavLink exact className="menu__item" activeClassName="menu__item_active" to="/" onClick={signOut}>Выйти</NavLink>
        </nav>
    )
}

export default NavBar
