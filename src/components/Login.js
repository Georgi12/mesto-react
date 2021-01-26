import React from "react";
import {useHistory}  from 'react-router-dom';
import EntranceScreen from "./EntranceScreen";
import {authApi} from "../utils/api";


function Login({errorHandler, handleLogin}) {

    const [value, setValue] = React.useState({email: '', password: ''});
    const history = useHistory()

    const handleInputChange = (e) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value.email || !value.password) return
        signInHandler(value)

    }

    const signInHandler = (data) => {
        authApi.signIn(data)
            .then((res) => {
                if(res.token) {
                    localStorage.setItem('jwt', res.token)
                    handleLogin()
                    history.push('/')
                }
            })
            .catch((err) => errorHandler(err));
    }
    return (
        <EntranceScreen onSubmit={handleSubmit} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>
    )
}

export default Login
