import React from 'react';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import ItemSelect from './ItemSelect';
import TableCell from '@material-ui/core/TableCell';

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

const LookupEditCellBase = ({availableColumnValues, value, onValueChange, classes, column}) => (
    <TableCell
        className={classes.lookupEditCell}
    >
        <ItemSelect
            classes={{ root: classes.inputRoot }}
            title={column.title}
            value={value}
            suggestions={availableColumnValues.map(item => ({ label: item, value: item }))}
            handleValueChange={(event) => onValueChange(event.value)}
        />
    </TableCell>
);
const LookupEditCell = withStyles(styles)(LookupEditCellBase);
export default LookupEditCell;