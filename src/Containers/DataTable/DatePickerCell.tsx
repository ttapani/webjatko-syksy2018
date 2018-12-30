import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import LoanDatePicker from './LoanDatePicker';

const styles = (theme: Theme) => createStyles({
    lookupEditCell: {
        paddingTop: theme.spacing.unit * 0.875,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    inputRoot: {
        width: '100%',
    },
});

const DatePickerCellBase = ({ value, onValueChange, title, classes, reservations }) => (
    <TableCell className={classes.lookupEditCell}>
        <LoanDatePicker
            title={title}
            value={value}
            handleChange={onValueChange}
            disabled={false}
            reservedTimeRanges={reservations}
        />
        {console.log(reservations)}
    </TableCell>
);
const DatePickerCell = withStyles(styles)(DatePickerCellBase);
export default DatePickerCell;