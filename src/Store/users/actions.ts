import { ActionCreator } from 'redux';
import { SetUsersAction, User } from './types';

export const setUsers: ActionCreator<SetUsersAction> = (users: User[]) => ({
    type: 'users/SET',
    payload: {
        users,
    },
});