import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import loans from '../AppData/loans';

interface IProps extends WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        midWidth: 700,
    },
    tableContainer: {
        height: 320,
    }
});

class LoansView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
                <div className={classes.tableContainer}>
                    <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Equipment</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Begins</TableCell>
                                        <TableCell>Ends</TableCell>
                                        <TableCell>Returned</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loans.map(row => {
                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.equipmentId}</TableCell>
                                                <TableCell>{row.userId}</TableCell>
                                                <TableCell>{row.begins}</TableCell>
                                                <TableCell>{row.ends}</TableCell>
                                                <TableCell>{row.returned}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        
                    </Paper>
                    </div>
        );
    }
}

export default withStyles(styles)(LoansView);