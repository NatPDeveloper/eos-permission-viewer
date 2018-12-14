import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const inititalState = {
    scatter: null,
    network: {
        blockchain:'eos',
        protocol:'https',
        host:'jungle2.cryptolions.io',
        port:443,
        chainId:'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    },
    account: null
};

const login = (state, action) => {
    return updateObject(state, { scatter: action.scatter })
}

// const logout = (state, action) => {
//     return updateObject( state, { 
//         scatter: null
//     });
// }

const reducer = (state = inititalState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN:
            return login(state, action)
        // case actionTypes.LOGOUT:
        //     return logout(state, action)
        default: 
            return state;
    }
}

export default reducer;