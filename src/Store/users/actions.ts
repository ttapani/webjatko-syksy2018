import { ActionCreator } from 'redux';
import { UsersAction, User } from './types';

export const setUsers: ActionCreator<UsersAction> = (users: User[]) => ({
    type: 'users/SET',
    payload: {
        users,
    },
});

export const addUsers: ActionCreator<UsersAction> = (users: User[]) => ({
    type: 'users/ADD',
    payload: {
        users,
    },
});

export const updateUsers: ActionCreator<UsersAction> = (users: User[]) => ({
    type: 'users/UPDATE',
    payload: {
        users,
    },
});

export const removeUsers: ActionCreator<UsersAction> = (users: User[]) => ({
    type: 'users/REMOVE',
    payload: {
        users,
    },
});