import { Reducer } from 'redux';
import { LoanState, LoanAction } from './types';
import loans from '../../AppData/loans';
import { addItemsToData, updateItemsInData, removeItemsFromData } from '../Helpers/itemhelpers';

export const initialState: LoanState = {
    loans: loans,
};

const loanReducer: Reducer<LoanState> = (state: LoanState = initialState, action) => {
    switch ((action as LoanAction).type) {
        case 'loans/SET':
            return { ...state, loans: action.payload.loans };
        case 'loans/ADD':
            return { ...state, loans: addItemsToData(state.loans, action.payload.loans)};
        case 'loans/UPDATE':
            return { ...state, loans: updateItemsInData(state.loans, action.payload.loans)}
        case 'loans/REMOVE':
            return { ...state, loans: removeItemsFromData(state.loans, action.payload.loans)}
        default:
            return state;
    }
};

export default loanReducer;