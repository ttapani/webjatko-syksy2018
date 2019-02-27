import { ActionCreator } from 'redux';
import { LoanAction, Loan, } from './types';

export const setLoans: ActionCreator<LoanAction> = (loans: Loan[]) => ({
    type: 'loans/SET',
    payload: {
        loans,
    },
});

export const addLoans: ActionCreator<LoanAction> = (loans: Loan) => ({
    type: 'loans/ADD',
    payload: {
        loans,
    },
});

export const updateLoans: ActionCreator<LoanAction> = (loans: Loan) => ({
    type: 'loans/UPDATE',
    payload: {
        loans,
    },
});

export const removeLoans: ActionCreator<LoanAction> = (loans: Loan) => ({
    type: 'loans/REMOVE',
    payload: {
        loans,
    },
});