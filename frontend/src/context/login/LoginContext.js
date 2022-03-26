import React, {createContext, useContext} from "react";
import ErrorContext from "../error message/ErrorContext";

const LoginContext = createContext();

export const LoginState = (props) => {

    const context = useContext(ErrorContext);
    const {errorMessage} = context;

    const checkStatusError = (res, json_res) => {
        if (res.status != 200) {
            errorMessage(json_res.error);
        }
    }

    const url = 'http://localhost:5000/auth';

    const login = async (email, password) => {
        const res = await fetch(url + '/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json_res = await res.json();
        checkStatusError(res, json_res);

        if(res.status === 200) {
            localStorage.setItem('auth-token', json_res);
        }
    }

    const signUp = async (email, password, fullname, profilePic) => {
        const res = await fetch(url + '/createUser', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({email, password, fullname, profilePic})
        })

        const json_res = await res.json();
        checkStatusError(res, json_res);
        console.log(json_res.authToken);

        if (res.status === 200){
            console.log('inside status 200');
            localStorage.setItem('auth-token', json_res.authToken);
        }
    }

    const getUser = async (authToken) => {
        const res = await fetch(url + '/getUser', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token' : authToken
            }
        })

        const json_res = res.json();
        checkStatusError(res, json_res);
        return json_res;
    }

    return (
        <LoginContext.Provider value={{login, signUp, getUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext;