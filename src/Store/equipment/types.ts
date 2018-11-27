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

export type EquipmentAction = SetEquipmentAction;