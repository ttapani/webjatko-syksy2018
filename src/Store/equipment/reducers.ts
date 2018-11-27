import { Reducer } from 'redux';
import { EquipmentState, EquipmentAction } from './types';
import equipment from '../../AppData/equipments';

export const initialState: EquipmentState = {
    equipment: equipment,
};

const equipmentReducer: Reducer<EquipmentState> = (state: EquipmentState = initialState, action) => {
    switch ((action as EquipmentAction).type) {
        case 'equipment/SET':
            return { ...state, equipment: action.payload.equipment };
        default:
            return state;
    }
};

export default equipmentReducer;