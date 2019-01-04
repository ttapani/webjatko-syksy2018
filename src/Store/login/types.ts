import { Action } from 'redux';

export interface UserCredentials {
    userName: string;
    password: string;
}

export interface User {
    userId?: string,
    userName?: string;
    type: string;
}

export interface LoginState {
    user: User;
    isLoading: boolean;
    error?: string;
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