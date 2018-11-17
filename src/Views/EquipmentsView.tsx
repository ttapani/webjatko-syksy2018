import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import equipments from '../AppData/equipments';
import DataTable from '../Containers/DataTable/DataTable';

interface IProps extends WithStyles<typeof styles> {

}

interface IState {

}

const styles = () => createStyles({
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
                    <DataTable
                        columns={[
                            {
                                title: "User",
                                name: 'name',
                            },
                            {
                                title: "Description",
                                name: 'description',
                            },
                        ]}
                        rows={equipments}
                    />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(EquipmentsView);