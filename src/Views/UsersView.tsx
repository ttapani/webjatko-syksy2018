import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import users from '../AppData/users';
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
    }
});

class UsersView extends React.Component<IProps, IState> {
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
                                    title: "Name",
                                    name: 'name',
                                },
                                {
                                    title: "Email",
                                    name: 'email',
                                },
                            ]}
                            rows={users}
                        />
                    </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(UsersView);