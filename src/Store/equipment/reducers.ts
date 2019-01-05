import { Reducer } from 'redux';
import { EquipmentState, EquipmentAction } from './types';
import equipment from '../../AppData/equipments';
import { addItemsToData, updateItemsInData, removeItemsFromData } from '../Helpers/itemhelpers';

export const initialState: EquipmentState = {
    equipment: equipment,
};

const equipmentReducer: Reducer<EquipmentState> = (state: EquipmentState = initialState, action) => {
    switch ((action as EquipmentAction).type) {
        case 'equipment/SET':
            return { ...state, equipment: action.payload.equipment };
        case 'equipment/ADD':
            return { ...state, equipment: addItemsToData(state.equipment, action.payload.equipment)};
        case 'equipment/UPDATE':
            return { ...state, equipment: updateItemsInData(state.equipment, action.payload.equipment)}
        case 'equipment/REMOVE':
            return { ...state, equipment: removeItemsFromData(state.equipment, action.payload.equipment)}
        default:
            return state;
    }
};

export default equipmentReducer;