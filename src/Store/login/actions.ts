import { ActionCreator } from 'redux';
import { LoginAction, User, UserCredentials } from './types';
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
        return new Promise<void>((resolve, reject) => {
            dispatch(loginUserStarted(credentials))
            console.log("login in progress");
            console.log(credentials);
            setTimeout(() => {
                let response = fakelogin(credentials);
                if(response.error == null) {
                    dispatch(loginUserSuccess({ userId: response.userId, userName: response.userName, type: response.type }));
                    resolve()
                } else {
                    dispatch(loginUserFailure(response.error));
                    reject();
                }
            }, 1000);
        });
    };
};

interface Response {
    userId?: string;
    userName?: string;
    type?: string;
    error?: string;
}

const fakelogin = (credentials: UserCredentials): Response => {
    if(credentials.userName == "asd" && credentials.password == "asd") {
        return { userId: "asd", userName: "keke", type: 'normal' };
    } else {
        return { error: "Invalid email or password" };
    }
}