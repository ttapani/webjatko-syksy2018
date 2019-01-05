export interface Item {
    id: string;
}

export function addItemsToData<T extends Item>(items: T[], added: T[]): T[] {
    // To conform to the fake data for now
    const startingAddedId = items.length > 0 ? Number.parseInt(items[items.length - 1].id) + 1 : 0;
    return [
        ...items,
        ...added.map((item, index) => ({
        // To conform to the fake data for now
        id: (startingAddedId + index).toString().padStart(3, '0'),
        ...item,
        })),
    ];
}

export function updateItemsInData<T extends Item>(items: T[], changed: T[]): T[] {
    return items.map(item => (changed[item.id] ? { ...item, ...changed[item.id] } : item));
}

export function removeItemsFromData<T extends Item>(items: T[], removed: string[]): T[] {
    const newArray = items.slice();
    removed.forEach((deletedId) => {
        const index = newArray.findIndex(item => item.id == deletedId);
        if (index > -1) {
            newArray.splice(index, 1);
        }
    }); 
    return newArray;
}