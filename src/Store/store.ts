import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import equipmentReducer from './equipment/reducers';
import { EquipmentState } from './equipment/types';

import userReducer from './users/reducers';
import { UserState } from './users/types';

import loanReducer from './loans/reducers';
import { LoanState } from './loans/types';

import loginReducer from './login/reducers';
import { LoginState } from './login/types';

import { combineReducers, Reducer } from 'redux';

import thunk from 'redux-thunk'

export interface ApplicationState {
    equipment: EquipmentState,
    users: UserState,
    loans: LoanState,
    login: LoginState,
};

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    equipment: equipmentReducer,
    users: userReducer,
    loans: loanReducer,
    login: loginReducer,
});

export const initStore = (initialState) => {
    return createStore(reducers, initialState, composeWithDevTools(/* applyMiddleware(thunkMiddleware), */ applyMiddleware(thunk)))
}