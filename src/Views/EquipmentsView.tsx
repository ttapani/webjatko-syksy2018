import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import equipments from '../AppData/equipments';

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
    },
});

class EquipmentsView extends React.Component<IProps, IState> {
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
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {equipments.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
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

export default withStyles(styles)(EquipmentsView);