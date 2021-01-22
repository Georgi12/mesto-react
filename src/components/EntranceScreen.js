import React from 'react';
import Header from "./Header";
import Form from "./Form";




function EntranceScreen({}) {

    const [value, setValue] = React.useState({email: '', password: ''});

    const handleInputChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    return (
        <>
            < Header />
            < Form
            >
                <>
                    <input
                        id="place-name" type="email" minLength="4" maxLength="30" required onChange={handleInputChange}
                        className="popup__input popup__name" name="email" placeholder="Email"
                    />
                    <span className="popup__error" id="place-name-error"></span>
                    <input
                        id="place-link" type="password" className="popup__input popup__description" name="password"
                        placeholder="Пароль" minLength="8" maxLength="16" required onChange={handleInputChange}
                    />
                    <span className="popup__error" id="place-link-error"></span>
                </>

            </Form>
        </>
    )
}

export default EntranceScreen;
