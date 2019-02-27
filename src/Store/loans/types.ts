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

export interface AddLoansAction extends Action {
    type: 'loans/ADD';
}

export interface UpdateLoansAction extends Action {
    type: 'loans/UPDATE';
}

export interface DeleteLoansAction extends Action {
    type: 'loans/REMOVE';
}


export type LoanAction = SetLoansAction | AddLoansAction | UpdateLoansAction | DeleteLoansAction;