import { Reducer } from 'redux';
import { UserState, UsersAction } from './types';
import users from '../../AppData/users';
import { addItemsToData, updateItemsInData, removeItemsFromData } from '../Helpers/itemhelpers';

export const initialState: UserState = {
    users: users,
};

const userReducer: Reducer<UserState> = (state: UserState = initialState, action) => {
    switch ((action as UsersAction).type) {
        case 'users/SET':
            return { ...state, users: action.payload.users };
        case 'users/ADD':
            return { ...state, users: addItemsToData(state.users, action.payload.users)};
        case 'users/UPDATE':
            return { ...state, users: updateItemsInData(state.users, action.payload.users)}
        case 'users/REMOVE':
            return { ...state, users: removeItemsFromData(state.users, action.payload.users)}
        default:
            return state;
    }
};

export default userReducer;