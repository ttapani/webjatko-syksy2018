import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { Grid, Table, TableHeaderRow, SearchPanel, Toolbar, PagingPanel, TableEditColumn, TableEditRow  } from '@devexpress/dx-react-grid-material-ui';
import { Column, SearchState, SortingState, IntegratedSorting, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { PagingState, IntegratedPaging, EditingState } from '@devexpress/dx-react-grid';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import CommitButton from './CommitButton';
import CancelButton from './CancelButton';
import AddButton from './AddButton';
import DeleteDialog from './DeleteDialog';
import TableCell from '@material-ui/core/TableCell';

import ItemSelect from './ItemSelect';

import { DatePicker } from 'material-ui-pickers';
import { format } from 'date-fns'
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons'

import users from '../../AppData/users';
import equipments from '../../AppData/equipments';

interface IProps extends WithStyles<typeof styles> {
    columns: Column[];
    rows: Array<any>;
    tableColumnExtensions?: Array<any>;
    editingColumnExtensions?: Array<any>;
}

interface IState {
    rows: Array<any>;
    editingRowIds: Array<any>;
    rowChanges: object;
    deletingRows: Array<any>;
    pageSizes: Array<number>;
    pageSize: number;
    currentPage: number;
}

const styles = (theme: Theme) => createStyles({
    table: {
        midWidth: 700,
    },
    lookupEditCell: {
        paddingTop: theme.spacing.unit * 0.875,
        paddingRight: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    },
});

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    commit: CommitButton,
    cancel: CancelButton,
    delete: DeleteButton,
};

const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
      <CommandButton
        onExecute={onExecute}
      />
    );
};

const availableValues = {
    equipmentId: equipments.map(row => row.name),
    userId: users.map(row => row.name)
};
  
const LookupEditCellBase = ({
    availableColumnValues, value, onValueChange, classes, column,
    }) => (
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
export const LookupEditCell = withStyles(styles)(LookupEditCellBase);

const DatePickerCellBase = ({ value, onValueChange, title, classes }) => (
        <TableCell className={classes.lookupEditCell}>
            <DatePicker
                allowKeyboardControl
                clearable
                autoOk
                placeholder={title}
                value={value ? value : null}
                // Format date back into db format
                onChange={(date) => onValueChange(date ? format(date, 'yyyy-MM-dd') : null)}
                animateYearScrolling
                format="dd/MM/yyyy"
                leftArrowIcon={<KeyboardArrowLeft/>}
                rightArrowIcon={<KeyboardArrowRight/>}
            />
        </TableCell>
);
export const DatePickerCell = withStyles(styles)(DatePickerCellBase);

const EditCell = (props) => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
        return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
    }
    if (column.name === 'begins' || column.name === 'ends' || column.name === 'returned') {
        return <DatePickerCell {...props} title={column.title} />;
    }
    return <TableEditRow.Cell {...props} />;
};

// Maps the data's id for the grid to use
const getRowId = row => row.id;

class DataTable extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            rows: this.props.rows,
            deletingRows: [],
            editingRowIds: [],
            rowChanges: {},
            pageSizes: [5, 10, 15, 0],
            pageSize: 10,
            currentPage: 0,
        };
    }

    getStateRows = () => {
        const { rows } = this.state;
        return rows;
    }

    getStateDeletingRows = () => {
        const { deletingRows } = this.state;
        return deletingRows;
    }
    
    cancelDelete = () => this.setState({ deletingRows: [] });

    deleteRows = () => {
        const rows = this.getStateRows().slice();
        this.getStateDeletingRows().forEach((rowId) => {
            const index = rows.findIndex(row => row.id === rowId);
            if (index > -1) {
                rows.splice(index, 1);
            }
        });
        this.setState({ rows, deletingRows: [] });
    };

    changeEditingRowIds = (editingRowIds) => {
        this.setState({ editingRowIds });
    }

    changeRowChanges = (rowChanges) => {
        this.setState({ rowChanges });
    }

    commitChanges = ({ added, changed, deleted }) => {
        let { rows } = this.state;
        if (added) {
            // To conform to the fake data for now
            const startingAddedId = rows.length > 0 ? Number.parseInt(rows[rows.length - 1].id) + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                // To conform to the fake data for now
                id: (startingAddedId + index).toString().padStart(3, '0'),
                ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        this.setState({ rows, deletingRows: deleted || this.getStateDeletingRows() });
    }

    changeCurrentPage = currentPage => this.setState({ currentPage })
    changePageSize = pageSize => this.setState({ pageSize });

    public render(): React.ReactNode {
        const { columns } = this.props;
        const { rows } = this.state;
        return (
            <>
                <Grid
                    columns={columns}
                    rows={rows}
                    getRowId={getRowId}
                >
                    <SortingState/>
                    <IntegratedSorting/>
                    <SearchState/>
                    <IntegratedFiltering/>
                    <PagingState
                        currentPage={this.state.currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        onPageSizeChange={this.changePageSize}
                        pageSize={this.state.pageSize}
                    />
                    <IntegratedPaging/>
                    <EditingState
                        columnExtensions={this.props.editingColumnExtensions}
                        editingRowIds={this.state.editingRowIds}
                        onEditingRowIdsChange={this.changeEditingRowIds}
                        rowChanges={this.state.rowChanges}
                        onRowChangesChange={this.changeRowChanges}
                        onCommitChanges={this.commitChanges}
                    />
                    <Table
                        columnExtensions={this.props.tableColumnExtensions}
                        
                    />
                    <TableHeaderRow showSortingControls/>
                    <Toolbar/>
                    <PagingPanel
                        pageSizes={this.state.pageSizes}
                    />
                    <SearchPanel/>
                    <TableEditRow
                        cellComponent={EditCell}
                    />
                    <TableEditColumn
                        width={170}
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                        commandComponent={Command}
                    />
                </Grid>
                <DeleteDialog
                    rows={rows.filter(row => this.state.deletingRows.indexOf(row.id) > -1)}
                    columns={columns}
                    open={this.state.deletingRows.length !== 0}
                    handleCancel={() => this.cancelDelete()}
                    handleDelete={() => this.deleteRows()}
                />
            </>
        );
    }
}

export default withStyles(styles)(DataTable);