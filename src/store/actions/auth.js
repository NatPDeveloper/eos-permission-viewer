import * as actionTypes from './actionTypes';

export const login = (scatter) => {
    return{
        type: actionTypes.LOGIN,
        scatter: scatter
    };
}

// export const logout = () => {
//     return{
//         type: actionTypes.LOGOUT
//     };
// }