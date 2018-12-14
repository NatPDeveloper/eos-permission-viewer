import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { Network } from 'scatterjs-core';

const network = Network.fromJson({
    blockchain:'eos',
    protocol:'https',
    host:'jungle2.cryptolions.io',
    port:443,
    chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
});

const inititalState = {
    scatter: null,
    network: network,
    account: null,
    loggedIn: false,
    result: null,
    sending: false
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

const sendResult = (state, action) => {
    return updateObject(state, { result: action.result, sending: false })
}

const reducer = (state = inititalState, action) => {
    switch(action.type) {
        case actionTypes.SET_SCATTER:
            return setScatter(state, action)
        case actionTypes.SET_ACCOUNT:
            return setAccount(state, action)
        case actionTypes.LOGOUT:
            return logout(state, action)
        case actionTypes.SEND_RESULT:
            return sendResult(state, action)
        default: 
            return state;
    }
}

export default reducer;