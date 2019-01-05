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
import DeleteDialog from './DeleteDialog/DeleteDialog';
import withTableData from './withTableData';
import DateTypeProvider from './DateTypeProvider';
import EditCell from './EditCell';
import { Loan } from 'src/Store/loans/types';
import { Item } from 'src/Store/Helpers/itemhelpers';

interface IProps extends WithStyles<typeof styles> {
    columns: Column[];
    rows: Array<any>;
    tableColumnExtensions?: Array<any>;
    editingColumnExtensions?: Array<any>;
    appData?: any;
    readonly?: boolean;
    onRowsChanged?: (data: Item[]) => void;
    onRowsAdded?: (data: Item[]) => void;
    onRowsDeleted?: (data: string[]) => void;
}

interface IState {
    rows: Array<any>;
    editingRowIds: Array<any>;
    rowChanges: object;
    deletingRows: Array<any>;
    pageSizes: Array<number>;
    pageSize: number;
    currentPage: number;
    dateColumns: Array<string>;
    addedRows: Array<any>;
}

const styles = (theme: Theme) => createStyles({
    table: {
        midWidth: 700,
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
            dateColumns: ['begins', 'ends', 'returned'],
            addedRows: [],
        };
    }

    // Maps the data's id for the grid to use
    getRowId = row => row.id;

    getStateAddedRows = () => {
        const { addedRows } = this.state;
        return addedRows;
    }

    getStateRows = () => {
        const { rows } = this.state;
        return rows;
    }

    getStateDeletingRows = () => {
        const { deletingRows } = this.state;
        return deletingRows;
    }
    
    cancelDelete = () => this.setState({ deletingRows: [] })

    deleteRows = () => {
        const rows = this.getStateRows().slice();
        this.props.onRowsDeleted(this.getStateDeletingRows());
        this.setState({ rows, deletingRows: [] });
    };

    changeEditingRowIds = (editingRowIds) => {
        this.setState({ editingRowIds });
    }

    changeRowChanges = (rowChanges) => {
        this.setState({ rowChanges });
    }

    commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            this.props.onRowsAdded(added);
        }
        if (changed) {
            this.props.onRowsChanged(changed);
        }
        this.setState({ deletingRows: deleted || this.getStateDeletingRows() });
        //this.props.onRowsChange(rows);
    }

    changeCurrentPage = (currentPage) => this.setState({ currentPage })
    changePageSize = (pageSize) => this.setState({ pageSize })

    changeAddedRows = (addedRows) => this.setState({
        addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        //   equipmentId: null,
        //   userId: null,
        //   begins: null,
        //   ends: null,
        //   returned: null
        })),
    });

    getAppData = () => {
        const { rows } = this.props;
        return { loans: rows, users: this.props.appData ? this.props.appData.users : [], equipment: this.props.appData ? this.props.appData.equipment: [] };
    }

    // Store a component when the class is instantiated so a re-render does not call it again
    private EditCellWithData = withTableData(this.getAppData)(EditCell);

    public render(): React.ReactNode {
        const { columns } = this.props;
        const { rows } = this.props;
        const { readonly } = this.props;
        return (
            <>
                <Grid
                    columns={columns}
                    rows={rows}
                    getRowId={this.getRowId}
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
                        addedRows={this.state.addedRows}
                        onAddedRowsChange={this.changeAddedRows}
                        columnExtensions={this.props.editingColumnExtensions}
                        editingRowIds={this.state.editingRowIds}
                        onEditingRowIdsChange={this.changeEditingRowIds}
                        rowChanges={this.state.rowChanges}
                        onRowChangesChange={this.changeRowChanges}
                        onCommitChanges={this.commitChanges}
                        columnEditingEnabled={readonly ? !readonly : true}
                    />
                    <DateTypeProvider
                        for={this.state.dateColumns}
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
                        // needs to be a readily returned component, not a function call
                        cellComponent={this.EditCellWithData}
                    />
                    <TableEditColumn
                        width={readonly ? 35 : 170}
                        showAddCommand={readonly ? !readonly : true}
                        showEditCommand={readonly ? !readonly : true}
                        showDeleteCommand={readonly ? !readonly : true}
                        commandComponent={Command}
                    />
                </Grid>
                <DeleteDialog
                    rows={this.state.rows.filter(row => this.state.deletingRows.indexOf(row.id) > -1)}
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