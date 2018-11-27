import { Action } from 'redux';

export interface UserState {
    users: User[];
}

export interface User {
    id: string;
    name: string;
}

export interface SetUsersAction extends Action {
    type: 'users/SET';
}

export type UserAction = SetUsersAction;