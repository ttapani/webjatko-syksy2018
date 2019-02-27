import { ActionCreator } from 'redux';
import { LoginAction, Session, UserCredentials } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { TokenKey } from '../../Constants/AppConstants';
import { ApplicationState } from '../store';
import { User } from '../users/types';

export const loginUserStarted: ActionCreator<LoginAction> = (credentials: UserCredentials) => ({
    type: 'login/LOGIN_STARTED',
    payload: {
        credentials,
    },
});

export const loginUserSuccess: ActionCreator<LoginAction> = (user: Session) => ({
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

export const refreshUserStarted: ActionCreator<LoginAction> = () => ({
    type: 'login/REFRESH_USER_STARTED',
})

export const refreshUserSuccess: ActionCreator<LoginAction> = (session: Session) => ({
    type: 'login/REFRESH_USER_SUCCESS',
    payload: {
        session,
    },
})

export const refreshUserFailure: ActionCreator<LoginAction> = () => ({
    type: 'login/REFRESH_USER_FAILURE',
})

export const loginUser = (credentials: UserCredentials): ThunkAction<Promise<void>, ApplicationState, {}, LoginAction> => {
    return async (dispatch: ThunkDispatch<ApplicationState, {}, LoginAction>, getState): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dispatch(loginUserStarted(credentials))
            console.log("login in progress");
            setTimeout(() => {
                let response = fakelogin(credentials, getState().users.users);
                if(response.error == null) {
                    dispatch(loginUserSuccess({ userId: response.userId, userName: response.userName, type: response.type }));
                    if(storageAvailable('localStorage')) {
                        localStorage.clear();
                        localStorage.setItem(TokenKey, JSON.stringify(response));
                    }
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
                localStorage.clear();
                resolve()
            }, 1000);
        });
    };
};

export const refreshUser = (): ThunkAction<Promise<void>, {}, {}, LoginAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, LoginAction>): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dispatch(refreshUserStarted())
            console.log("refresh in progress");
            try {
                if(storageAvailable('localStorage')) {
                    let userToken = localStorage.getItem(TokenKey);
                    let session = JSON.parse(userToken);
                    if(session == null) {
                        dispatch(refreshUserFailure());
                        reject();
                    } else {
                        dispatch(refreshUserSuccess(session));
                        console.log("refresh succesful");
                        resolve();
                    }
                } else {
                    console.log("localstorage not available");
                    dispatch(refreshUserFailure());
                    reject();
                }
            }
            catch {
                if(storageAvailable('localStorage')) {
                    console.log("failed parsing token from storage");
                    localStorage.clear();
                    dispatch(refreshUserFailure());
                    reject();
                } else {
                    console.log("localstorage not available");
                    dispatch(refreshUserFailure());
                    reject();
                }
            }
        });
    };
};

interface Response {
    userId?: string;
    userName?: string;
    type?: string;
    error?: string;
}

const fakelogin = (credentials: UserCredentials, users): Response => {
    let matchingUsers = users.filter((user: User) => user.email == credentials.userName);
    if(matchingUsers.length == 0) {
        return { error: "Invalid email or password" };
    } else if(matchingUsers.length == 1 && matchingUsers[0].password == credentials.password) {
        if(matchingUsers[0].name == "Ylläpitäjä") {
            return { userId: matchingUsers[0].id, userName: matchingUsers[0].name, type: "admin", error: null };
        } else {
            return { userId: matchingUsers[0].id, userName: matchingUsers[0].name, type: "normal", error: null };
        }
    }
}

// Blatantly copied from MDN
function storageAvailable(type: string) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}