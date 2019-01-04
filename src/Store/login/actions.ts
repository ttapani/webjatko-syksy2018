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

export const logoutUserStarted: ActionCreator<LoginAction> = () => ({
    type: 'login/LOGOUT_STARTED',
});

export const logoutUserSuccess: ActionCreator<LoginAction> = () => ({
    type: 'login/LOGOUT_SUCCESS',
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

export const logoutUser = (): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, LoginAction>): Promise<void> => {
        return new Promise<void>((resolve) => {
            dispatch(logoutUserStarted())
            console.log("logout in progress");
            setTimeout(() => {
                dispatch(logoutUserSuccess());
                resolve()
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
    if(credentials.userName == "user@example.com" && credentials.password == "basicpassword") {
        return { userId: "user@example.com", userName: "Peruskäyttäjä", type: 'normal' };
    } else if(credentials.userName == "admin@example.com" && credentials.password == "adminpassword") {
        return { userId: "admin@example.com", userName: "Ylläpitäjä", type: 'admin' };
    } else {
        return { error: "Invalid email or password" };
    }
}