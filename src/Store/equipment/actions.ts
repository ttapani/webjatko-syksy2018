import { ActionCreator } from 'redux';
import { EquipmentAction, Equipment } from './types';

export const setEquipment: ActionCreator<EquipmentAction> = (equipment: Equipment[]) => ({
    type: 'equipment/SET',
    payload: {
        equipment,
    },
});

export const addEquipment: ActionCreator<EquipmentAction> = (equipment: Equipment[]) => ({
    type: 'equipment/ADD',
    payload: {
        equipment,
    },
});

export const updateEquipment: ActionCreator<EquipmentAction> = (equipment: Equipment[]) => ({
    type: 'equipment/UPDATE',
    payload: {
        equipment,
    },
});

export const removeEquipment: ActionCreator<EquipmentAction> = (equipment: Equipment[]) => ({
    type: 'equipment/REMOVE',
    payload: {
        equipment,
    },
});