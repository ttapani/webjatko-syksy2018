import React from 'react';
import { TableEditRow  } from '@devexpress/dx-react-grid-material-ui';
import { LoanInterval } from 'src/Views/LoansView';
import { getReservedIntervals } from '../../Views/LoansView';
import LookupEditCell from './LookupEditCell';
import DatePickerCell from './DatePickerCell';
import users from '../../AppData/users';
import equipments from '../../AppData/equipments';
import loans from '../../AppData/loans';

const availableValues = {
    equipmentId: equipments.map(row => row.name),
    userId: users.map(row => row.name)
};

const EditCell = (props) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }
    if (column.name === 'begins' || column.name === 'ends' || column.name === 'returned') {
        let intervals = Array<LoanInterval>();
        if (props.row.equipmentId !== null) {
            intervals = getReservedIntervals(props.row.equipmentId, props.data());
        }
        return <DatePickerCell {...props} title={column.title} reservations={intervals} />;
    }
    return <TableEditRow.Cell {...props} />;
};
export default EditCell;