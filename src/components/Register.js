import React from "react";
import EntranceScreen from "./EntranceScreen";
import {authApi} from "../utils/api";
import { useHistory } from "react-router-dom";

function Register({errorHandler}) {

    const [value, setValue] = React.useState({email: '', password: ''});
    const history = useHistory()

    const handleInputChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUpHandler(value)
    }

    const signUpHandler = (data) => {
        authApi.signUp(data)
            .then((res) => {
                if(res) {
                    history.push('/sign-in')
                }
            })
            .catch((err) => errorHandler(err));
    }

    return (
        <EntranceScreen onSubmit={handleSubmit} handleInputChange={handleInputChange}/>
    )
}

export default Register
