import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const inititalState = {
    scatter: null,
    network: {
        blockchain:'eos',
        protocol:'https',
        host:'jungle2.cryptolions.io',
        port:443,
        chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    },
    account: null,
    loggedIn: false
};

const setScatter = (state, action) => {
    return updateObject(state, { scatter: action.scatter })
}

const setAccount = (state, action) => {
    return updateObject(state, { account: action.account, loggedIn: true })
}

const logout = (state, action) => {
    return updateObject(state, { loggedIn: false })
}

// const setScatter = (state, action) => {
//     return {
//         scatter: action.scatter
//     }
// }

// const setAccount = (state, action) => {
//     return {
//         scatter: action.scatter,
//         loggedIn: true
//     }
// }

// const logout = (state, action) => {
//     return {
//         scatter: action.scatter,
//         loggedIn: false
//     }
// }

const reducer = (state = inititalState, action) => {
    switch(action.type) {
        case actionTypes.SET_SCATTER:
            return setScatter(state, action)
        case actionTypes.SET_ACCOUNT:
            return setAccount(state, action)
        case actionTypes.LOGOUT:
            return logout(state, action)
        default: 
            return state;
    }
}

export default reducer;