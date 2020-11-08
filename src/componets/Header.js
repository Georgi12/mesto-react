import logo from "../images/header-logo.svg";


function Header() {
    return(
        <header className="header">
            <img src={logo} className='logo' alt="Логотип, надпись на английском -  'mesto russia'"/>
        </header>
    )
}

export default Header;