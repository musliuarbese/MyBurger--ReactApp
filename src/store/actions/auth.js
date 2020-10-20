import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}


export const authSuccess = (authData) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        error: error
    }
}

export const auth = (email, password) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AAAAggTJxwY:APA91bHRjTQiC-9Oj6rDYEDgc0wvOLXpNN0TLGlqjyVQ_HiC2AUUII7ZXrYOcJwgVn_kWpGA4dKlK-fF0NWDvf7SHTinm3l5903ldo5K2dyXGTuhYgU3l_CXS9yqYe2b3uLikiM0cGij')
         .then(response => {
             console.log(authSuccess(response.data))
         })
         .catch(err =>{
             console.log(err);
             dispatch(authFail(err));
         })
    }
}