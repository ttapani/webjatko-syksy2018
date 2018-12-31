import { Action } from 'redux';

export interface UserCredentials {
    userName: String;
    password: String;
}

export interface User {
    userId?: String,
    userName?: String;
    type: String;
}

export interface LoginState {
    user: User;
    isLoading: Boolean;
    error?: String;
}

export interface LoginUserStartedAction extends Action {
    type: 'login/LOGIN_STARTED';
}

export interface LoginUserActionSuccess extends Action {
    type: 'login/LOGIN_SUCCESS';
}

export interface LoginUserFailureAction extends Action {
    type: 'login/LOGIN_FAILURE';
}

export type LoginAction = LoginUserStartedAction | LoginUserActionSuccess | LoginUserFailureAction;