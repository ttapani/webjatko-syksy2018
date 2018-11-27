import { Reducer } from 'redux';
import { LoanState, LoanAction } from './types';
import loans from '../../AppData/loans';

export const initialState: LoanState = {
    loans: loans,
};

const loanReducer: Reducer<LoanState> = (state: LoanState = initialState, action) => {
    switch ((action as LoanAction).type) {
        case 'loans/SET':
            return { ...state, loans: action.payload.loans };
        default:
            return state;
    }
};

export default loanReducer;