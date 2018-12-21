import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user'); //usun token -- usera ?
    localStorage.removeItem('expirationDate'); // usun czas 
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key; // zapytanie jak sie powiodlo zwraca mi token
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // czas kiedy sesja wygasnie + 1h
            localStorage.setItem('token', token); // ustawimay token globalnie
            localStorage.setItem('expirationDate', expirationDate); // i czeas kiedy wyasnie sesje
            dispatch(authSuccess(token)); // zwracamy obiekt type: success i token obecny
            dispatch(checkAuthTimeout(3600)); //za godzien wywalaj log out
        })
            .catch(err => {
                dispatch(authFail(err)) // mamy errror zwrcmy error i blad
            })
    }
}

export const authSignup = (username, email, password1, password2) => {
    console.log("signup");
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
            .catch(err => {
                dispatch(authFail(err))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}