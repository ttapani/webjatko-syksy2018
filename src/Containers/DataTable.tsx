import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Table, TableHeaderRow, SearchPanel, Toolbar, PagingPanel  } from '@devexpress/dx-react-grid-material-ui';
import { Column, SearchState, SortingState, IntegratedSorting, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';

interface IProps extends WithStyles<typeof styles> {
    columns: Column[];
    rows: object[];
}

interface IState {

}

const styles = () => createStyles({
    table: {
        midWidth: 700,
    },
});

class DataTable extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const { columns, rows } = this.props;
        return (
            <Grid
                columns={columns}
                rows={rows}
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
                <Table/>
                <TableHeaderRow showSortingControls/>
                <Toolbar/>
                <PagingPanel/>
                <SearchPanel/>
            </Grid>
        );
    }
}

export default withStyles(styles)(DataTable);