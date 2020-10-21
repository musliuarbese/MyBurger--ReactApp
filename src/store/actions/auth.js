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

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('logout');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) =>{
    return dispatch =>{
        setTimeout(() =>{
           dispatch(logout());
        }, expirationTime * 1000)
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
             console.log(response);
             const expirationDate = new Date(new Date().getTime + response.data.expirationIn * 1000);
             localStorage.setItem('token', response.data.idtoken);
             localStorage.setItem('expirationDate', expirationDate);
             localStorage.setItem('userId', response.data.localId);
             dispatch(authSuccess(response.data.idtoken, response.data.localId));
             dispatch(checkAuthTimeOut(response.data.expiresIn))
         })
         .catch(err =>{
             dispatch(authFail(err.response.data.error));
         })
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
       const token = localStorage.getItem('token');
       if(!token){
         dispatch(logout());
       }else{
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if(expirationDate > new Date()){
              dispatch(logout());
          }else{
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeOut(expirationDate.getSeconds() - new Date().getSeconds()));
          }
       }
    }
}