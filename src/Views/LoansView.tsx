import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import loans from '../AppData/loans';
import equipments from '../AppData/equipments';
import users from '../AppData/users';
import DataTable from '../Containers/DataTable';
import Paper from '@material-ui/core/Paper';

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

const getEquipmentName = (id: string) => {
    return equipments.find(equipment => equipment.id === id).name;
}

const getUserName = (id: string) => {
    return users.find(users => users.id === id).name;
}

class LoansView extends React.Component<IProps, IState> {
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
                                    title: 'Equipment',
                                    name: 'equipmentId',
                                    getCellValue: (row) => getEquipmentName(row.equipmentId),
                                },
                                {
                                    title: "User",
                                    name: 'userId',
                                    getCellValue: (row) => getUserName(row.userId),
                                },
                                {
                                    title: "Begin",
                                    name: 'begins',
                                },
                                {
                                    title: "Ends",
                                    name: "ends",
                                    
                                },
                                {
                                    title: "Returned",
                                    name: "returned",
                                },
                            ]}
                            rows={loans}
                        />
                    </Paper>
                </div>
        );
    }
}

export default withStyles(styles)(LoansView);