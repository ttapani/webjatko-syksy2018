import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import equipmentReducer from './equipment/reducers';
import { EquipmentState } from './equipment/types';

import userReducer from './users/reducers';
import { UserState } from './users/types';

import { combineReducers, Reducer } from 'redux';

const exampleInitialState = {
    count: 0,
} 

export interface ApplicationState {
    equipment: EquipmentState,
    users: UserState,
    counter: {
        count: number,
    }
};

export const actionTypes = {
    ADD: 'ADD',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return Object.assign({}, state, {
                count: state.count + 1
            })
        default: return state
    }
}

// ACTIONS
export const addCount = () => dispatch => {
    return dispatch({ type: actionTypes.ADD })
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    equipment: equipmentReducer,
    users: userReducer,
    counter: reducer,
});

export const initStore = (initialState) => {
    return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}