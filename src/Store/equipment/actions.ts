import { ActionCreator } from 'redux';
import { SetEquipmentAction, Equipment } from './types';

export const setEquipment: ActionCreator<SetEquipmentAction> = (equipment: Equipment[]) => ({
    type: 'equipment/SET',
    payload: {
        equipment,
    },
});