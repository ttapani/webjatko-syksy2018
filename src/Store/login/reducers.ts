import { Reducer } from 'redux';
import { LoginState, LoginAction } from './types';

export const guestUser = { userId: null, userName: "Guest", type: 'guest' };

export const initialState: LoginState = {
    session: guestUser,
    //user: null,
    isLoading: false,
    error: null,
};

const loanReducer: Reducer<LoginState> = (state: LoginState = initialState, action) => {
    switch ((action as LoginAction).type) {
        case 'login/LOGIN_STARTED':
            return { ...state, session: guestUser, isLoading: true, error: null };
        case 'login/LOGIN_SUCCESS':
            return { ...state, session: action.payload.user, isLoading: false, error: null };
        case 'login/LOGIN_FAILURE':
            return { ...state, error: action.payload.error, isLoading: false };
        case 'login/LOGOUT_STARTED':
            return { ...state, isLoading: true };
        case 'login/LOGOUT_SUCCESS':
            return { ...state, session: guestUser, isLoading: false };
        default:
            return state;
    }
};

export default loanReducer;