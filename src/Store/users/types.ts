import { Action } from 'redux';

export interface UserState {
    users: User[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    description: string;
    password: string;
}

export interface SetUsersAction extends Action {
    type: 'users/SET';
}

export interface AddUsersAction extends Action {
    type: 'users/ADD';
}

export interface UpdateUsersAction extends Action {
    type: 'users/UPDATE';
}

export interface DeleteUsersAction extends Action {
    type: 'users/REMOVE';
}


export type UsersAction = SetUsersAction | AddUsersAction | UpdateUsersAction | DeleteUsersAction;