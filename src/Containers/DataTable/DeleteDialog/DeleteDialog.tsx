import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogDeleteButton from './DialogDeleteButton';
import DialogCancelButton from './DialogCancelButton';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { Column } from '@devexpress/dx-react-grid';
import Paper from '@material-ui/core/Paper';

interface IProps {
    rows: any[];
    columns: Column[];
    open: boolean;
    handleCancel: () => void;
    handleDelete: () => void;
}

interface IState {
}

class DeleteDialog extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { open: false };
    }
    
    render() {
        return (
            <Dialog
            fullWidth
            maxWidth='md'
            open={this.props.open}
            aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Delete following row?
                    </DialogContentText>
                    <Paper>
                        <Grid
                            rows={this.props.rows}
                            columns={this.props.columns}
                        >
                            <Table />
                            <TableHeaderRow />
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <DialogCancelButton onExecute={this.props.handleCancel} />
                    <DialogDeleteButton onExecute={this.props.handleDelete} />
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteDialog;