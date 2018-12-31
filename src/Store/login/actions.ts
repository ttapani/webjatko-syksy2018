import { ActionCreator } from 'redux';
import { LoginAction, User, UserCredentials, LoginState } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const loginUserStarted: ActionCreator<LoginAction> = (credentials: UserCredentials) => ({
    type: 'login/LOGIN_STARTED',
    payload: {
        credentials,
    },
});

export const loginUserSuccess: ActionCreator<LoginAction> = (user: User) => ({
    type: 'login/LOGIN_SUCCESS',
    payload: {
        user,
    },
});

export const loginUserFailure: ActionCreator<LoginAction> = (error: String) => ({
    type: 'login/LOGIN_FAILURE',
    payload: {
        error,
    },
});

export const loginUser = (credentials: UserCredentials): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, LoginAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(loginUserStarted(credentials))
            console.log("login in progress");
            console.log(credentials);
            setTimeout(() => {
                dispatch(loginUserSuccess({ userId: "asd", userName: "keke", type: 'normal' }))
                resolve();
            }, 1000);
        });
    };
};