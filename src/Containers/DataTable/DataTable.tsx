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

interface IProps extends WithStyles<typeof styles> {
    columns: Column[];
    rows: Array<any>;
}

interface IState {
    rows: Array<any>;
    editingRowIds: Array<any>;
    rowChanges: object;
    deletingRows: Array<any>;
}

const styles = (theme: Theme) => createStyles({
    table: {
        midWidth: 700,
    }
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
          const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
          rows = [
            ...rows,
            ...added.map((row, index) => ({
              id: startingAddedId + index,
              ...row,
            })),
          ];
        }
        if (changed) {
          rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        this.setState({ rows, deletingRows: deleted || this.getStateDeletingRows() });
    }

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
                        defaultCurrentPage={0}
                        pageSize={5}
                    />
                    <IntegratedPaging/>
                    <EditingState
                        editingRowIds={this.state.editingRowIds}
                        onEditingRowIdsChange={this.changeEditingRowIds}
                        rowChanges={this.state.rowChanges}
                        onRowChangesChange={this.changeRowChanges}
                        onCommitChanges={this.commitChanges}
                    />
                    <Table/>
                    <TableHeaderRow showSortingControls/>
                    <Toolbar/>
                    <PagingPanel/>
                    <SearchPanel/>
                    <TableEditRow/>
                    <TableEditColumn
                        width={170}
                        showAddCommand
                        showEditCommand
                        showDeleteCommand
                        commandComponent={Command}
                    />
                </Grid>
                {console.log(rows)}
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