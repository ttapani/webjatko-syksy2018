import { Reducer } from 'redux';
import { UserState, UserAction } from './types';
import users from '../../AppData/users';

export const initialState: UserState = {
    users: users,
};

const userReducer: Reducer<UserState> = (state: UserState = initialState, action) => {
    switch ((action as UserAction).type) {
        case 'users/SET':
            return { ...state, users: action.payload.users };
        default:
            return state;
    }
};

export default userReducer;