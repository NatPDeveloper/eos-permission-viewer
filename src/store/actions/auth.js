import * as actionTypes from './actionTypes';

export const setScatter = (scatter) => {
    return{
        type: actionTypes.SET_SCATTER,
        scatter: scatter
    };
}

export const setAccount = (account) => {
    return{
        type: actionTypes.SET_ACCOUNT,
        account: account
    };
}

export const logout = () => {
    return{
        type: actionTypes.LOGOUT
    };
}

export const sendResult = (result) => {
    return{
        type: actionTypes.SEND_RESULT
    };
}