import { Action } from 'redux';

export interface UserCredentials {
    userName: string;
    password: string;
}

export interface Session {
    userId?: string,
    userName?: string;
    type: string;
}

export interface LoginState {
    session: Session;
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

export interface LogoutUserStartedAction extends Action {
    type: 'login/LOGOUT_STARTED';
}

export interface LogoutUserActionSuccess extends Action {
    type: 'login/LOGOUT_SUCCESS';
}

export interface RefresUserStartedAction extends Action {
    type: 'login/REFRESH_USER_STARTED';
}

export interface RefreshUserSuccessAction extends Action {
    type: 'login/REFRESH_USER_SUCCESS';
}

export interface RefresUserFailureAction extends Action {
    type: 'login/REFRESH_USER_FAILURE';
}

type LoginUserAction = LoginUserStartedAction | LoginUserActionSuccess | LoginUserFailureAction;
type LogoutUserAction = LogoutUserStartedAction | LogoutUserActionSuccess;
type RefreshUserAction = RefresUserStartedAction | RefreshUserSuccessAction | RefresUserFailureAction;

export type LoginAction = LoginUserAction | LogoutUserAction | RefreshUserAction;