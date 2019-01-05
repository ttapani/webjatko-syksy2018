import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import DataTable from '../Containers/DataTable/DataTable';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { addLoans, removeLoans, updateLoans } from '../Store/loans/actions';
import { ApplicationState } from '../Store/store';
import { Loan, LoanAction } from '../Store/loans/types';
import { User } from '../Store/users/types';
import { Equipment } from '../Store/equipment/types';

import { getIdByName, getNameById } from '../Helpers/data';
import { Session } from 'src/Store/login/types';

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
}

interface IStateProps {
    loans: Loan[];
    equipment: Equipment[];
    users: User[];
    session: Session;
}

interface IDispatchProps {
    addLoans: (data: Loan[]) => void;
    updateLoans: (data: Loan[]) => void;
    removeLoans: (data: string[]) => void;
}

type Props = IProps & IStateProps & IDispatchProps;

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

class LoansTable extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.getUserLoans = this.getUserLoans.bind(this);
    }

    private getUserLoans() {
        return this.props.loans.filter((loan) => loan.userId == this.props.session.userId);
    }

    public render(): React.ReactNode {
        const { classes, loans, equipment, users } = this.props;
        return (
                <div className={classes.tableContainer}>
                    <Paper className={classes.root}>
                        <DataTable
                            columns={[
                                {
                                    title: 'Equipment',
                                    name: 'equipmentId',
                                    getCellValue: (row) => getNameById(row.equipmentId, equipment),
                                },
                                {
                                    title: "User",
                                    name: 'userId',
                                    getCellValue: (row) => getNameById(row.userId, users),
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
                                  createRowChange: (row, value) => ({ equipmentId: getIdByName(value, equipment) }),
                                },
                                {
                                  columnName: 'userId',
                                  createRowChange: (row, value) => ({ userId: getIdByName(value, users) }),
                                },
                            ]}
                            rows={this.props.session.type == "normal" ? this.getUserLoans() : loans}
                            onRowsChanged={this.props.updateLoans}
                            onRowsAdded={this.props.addLoans}
                            onRowsDeleted={this.props.removeLoans}
                            appData={{equipment: equipment, users: users }}
                        />
                    </Paper>
                </div>
        );
    }
}

const mapStateToProps = ({ loans: { loans }, equipment: { equipment }, users: { users }, login: { session }}: ApplicationState): IStateProps => ({ loans, equipment, users, session })

const mapDispatchToProps = (dispatch: Dispatch<LoanAction>) => {
    return {
        addLoans: bindActionCreators(addLoans, dispatch),
        updateLoans: bindActionCreators(updateLoans, dispatch),
        removeLoans: bindActionCreators(removeLoans, dispatch),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoansTable));
