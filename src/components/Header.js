import logo from "../images/header-logo.svg";
import NavBar from "./NavBar";


function Header({headerEmail, signOut}) {
    return(
        <header className="header">
            <img src={logo} className='logo' alt="Логотип, надпись на английском -  'mesto russia'"/>
            <p className="header__email">{headerEmail}</p>
            <NavBar signOut={signOut}/>
        </header>
    )
}

export default Header;
