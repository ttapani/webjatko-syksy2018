import { ActionCreator } from 'redux';
import { SetLoansAction, Loan } from './types';

export const setLoans: ActionCreator<SetLoansAction> = (loans: Loan[]) => ({
    type: 'loans/SET',
    payload: {
        loans,
    },
});