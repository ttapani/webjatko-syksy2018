import { User } from '../Store/users/types';
import { Equipment } from '../Store/equipment/types';

export const getNameById = (id: string, collection: Array<Equipment | User>) => {
    let item = collection.find(item => item.id === id);
    if(item)
        return item.name;
    else
        return '';
}

export const getIdByName = (name: string, collection: Array<Equipment | User>) => {
    let item = collection.find(item => item.name === name);
    if(item)
        return item.id;
    else
        return '';
}