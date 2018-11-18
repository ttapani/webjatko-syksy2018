import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import loans from '../AppData/loans';
import equipments from '../AppData/equipments';
import users from '../AppData/users';
import DataTable from '../Containers/DataTable/DataTable';
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
    let equipment = equipments.find(equipment => equipment.id === id);
    if(equipment)
        return equipment.name;
    else
        return '';
}

const getUserName = (id: string) => {
    let user = users.find(users => users.id === id)
    if(user)
        return user.name;
    else
        return '';
}

const getEquipmentId = (name: string) => {
    let equipment = equipments.find(equipment => equipment.name === name);
    if(equipment)
        return equipment.id;
    else
        return '';
}

const getUserId = (name: string) => {
    let user = users.find(users => users.name === name)
    if(user)
        return user.id;
    else
        return '';
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
                                    title: "Begins",
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
                            editingColumnExtensions={[
                                {
                                  columnName: 'equipmentId',
                                  createRowChange: (row, value) => ({ equipmentId: getEquipmentId(value) }),
                                },
                                {
                                  columnName: 'userId',
                                  createRowChange: (row, value) => ({ userId: getUserId(value) }),
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