import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import DataTable from '../Containers/DataTable/DataTable';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setLoans } from '../Store/loans/actions';
import { ApplicationState } from '../Store/store';
import { Loan, LoanAction } from '../Store/loans/types';
import { User } from '../Store/users/types';
import { Equipment } from '../Store/equipment/types';

interface IProps extends WithStyles<typeof styles> {
}

interface IStateProps {
    loans: Loan[];
    equipment: Equipment[];
    users: User[];
}

interface IDispatchProps {
    setLoans: (data) => void;
}

type IAllProps = IProps & IStateProps & IDispatchProps;

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

export class LoanInterval {
    constructor(readonly begins: string, readonly ends: string, readonly returned: string) {
    }
}

export const getReservedIntervals = (equipmentId: string, dataSet: Array<any>) => {
    const intervals = Array<LoanInterval>();
    const matches = dataSet.filter(item => item.equipmentId === equipmentId);
    console.log("item " + equipmentId);
    if(matches.length > 0) {
        matches.map((item) => intervals.push(new LoanInterval(item.begins, item.ends, item.returned)));
    }
    return intervals;
}

class LoansView extends React.Component<IAllProps, IState> {
    constructor(props: IAllProps) {
        super(props);

    }

    setLoans = (data) => {
        this.props.setLoans(data);
    }

    getEquipmentName = (id: string) => {
        let equipment = this.props.equipment.find(equipment => equipment.id === id);
        if(equipment)
            return equipment.name;
        else
            return '';
    }
    
    getUserName = (id: string) => {
        let user = this.props.users.find(users => users.id === id)
        if(user)
            return user.name;
        else
            return '';
    }
    
    getEquipmentId = (name: string) => {
        let equipment = this.props.equipment.find(equipment => equipment.name === name);
        if(equipment)
            return equipment.id;
        else
            return '';
    }
    
    getUserId = (name: string) => {
        let user = this.props.users.find(users => users.name === name)
        if(user)
            return user.id;
        else
            return '';
    }

    public render(): React.ReactNode {
        const { classes, loans } = this.props;
        return (
                <div className={classes.tableContainer}>
                    <Paper className={classes.root}>
                        <DataTable
                            columns={[
                                {
                                    title: 'Equipment',
                                    name: 'equipmentId',
                                    getCellValue: (row) => this.getEquipmentName(row.equipmentId),
                                },
                                {
                                    title: "User",
                                    name: 'userId',
                                    getCellValue: (row) => this.getUserName(row.userId),
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
                                  createRowChange: (row, value) => ({ equipmentId: this.getEquipmentId(value) }),
                                },
                                {
                                  columnName: 'userId',
                                  createRowChange: (row, value) => ({ userId: this.getUserId(value) }),
                                },
                            ]}
                            rows={loans}
                            onRowsChange={this.setLoans}
                            mapAvailableValues={["equipmentId", getReservedIntervals]}
                        />
                    </Paper>
                </div>
        );
    }
}

const mapStateToProps = ({ loans: { loans }, equipment: { equipment }, users: { users }}: ApplicationState): IStateProps => ({ loans, equipment, users })

const mapDispatchToProps = (dispatch: Dispatch<LoanAction>) => {
    return {
        setLoans: bindActionCreators(setLoans, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoansView));
