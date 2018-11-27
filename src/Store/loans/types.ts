import { Action } from 'redux';

export interface LoanState {
    loans: Loan[];
}

export interface Loan {
    id: string,
    equipmentId: string,
    userId: string,
    begins: string,
    ends: string,
    returned: string,
}

export interface SetLoansAction extends Action {
    type: 'loans/SET';
}

export type LoanAction = SetLoansAction;