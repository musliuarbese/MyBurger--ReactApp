import * as actionTypes from './actionTypes';
import axios from 'axios';
//import reducer from '../reducers/auth';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idtoken: token,
        userId: userId
    }
}

export const authFail = (error) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        error: error
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AAAAggTJxwY:APA91bHRjTQiC-9Oj6rDYEDgc0wvOLXpNN0TLGlqjyVQ_HiC2AUUII7ZXrYOcJwgVn_kWpGA4dKlK-fF0NWDvf7SHTinm3l5903ldo5K2dyXGTuhYgU3l_CXS9yqYe2b3uLikiM0cGij';
         if(!isSignup ){
             url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AAAAggTJxwY:APA91bHRjTQiC-9Oj6rDYEDgc0wvOLXpNN0TLGlqjyVQ_HiC2AUUII7ZXrYOcJwgVn_kWpGA4dKlK-fF0NWDvf7SHTinm3l5903ldo5K2dyXGTuhYgU3l_CXS9yqYe2b3uLikiM0cGij';
         }
        axios.post(url, authData)
         .then(response => {
             console.log(authSuccess(response.data.idtoken, response.data.localId))
         })
         .catch(err =>{
             dispatch(authFail(err.response.data.error));
         })
    }
}