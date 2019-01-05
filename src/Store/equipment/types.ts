import { Action } from 'redux';

export interface EquipmentState {
    equipment: Equipment[];
}

export interface Equipment {
    id: string;
    name: string;
}

export interface SetEquipmentAction extends Action {
    type: 'equipment/SET';
}

export interface AddEquipmentAction extends Action {
    type: 'equipment/ADD';
}

export interface UpdateEquipmentAction extends Action {
    type: 'equipment/UPDATE';
}

export interface DeleteEquipmentAction extends Action {
    type: 'equipment/REMOVE';
}


export type EquipmentAction = SetEquipmentAction | AddEquipmentAction | UpdateEquipmentAction | DeleteEquipmentAction;