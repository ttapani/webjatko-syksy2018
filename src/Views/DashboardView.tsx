import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import DataTable from '../Containers/DataTable/DataTable';
import { Loan, LoanAction } from 'src/Store/loans/types';
import { Equipment } from 'src/Store/equipment/types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setLoans } from '../Store/loans/actions';
import { ApplicationState } from 'src/Store/store';
import { Session } from 'src/Store/login/types';
import { getIdByName, getNameById } from '../Helpers/data';

interface IProps extends WithStyles<typeof styles> {

}

interface IState {

}

interface IStateProps {
    loans: Loan[];
    equipment: Equipment[];
    session: Session;
}

interface IDispatchProps {
    setLoans: (data) => void;
}

type Props = IProps & IStateProps & IDispatchProps;

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

class DashboardView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.getUserLoans = this.getUserLoans.bind(this);
    }

    setLoans = (data) => {
        this.props.setLoans(data);
    }

    private getUserLoans() {
        return this.props.loans.filter((loan) => loan.userId == this.props.session.userId);
    }

    public render(): React.ReactNode {
        const { classes, loans, equipment } = this.props;
        if(this.props.session.type == "normal") {
            return (
                <div>
                    <Typography variant='h3'>
                        Welcome!
                    </Typography>
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
                                ]}
                                rows={this.props.session.type == "normal" ? this.getUserLoans() : loans}
                                onRowsChange={this.setLoans}
                                appData={{equipment: equipment}}
                            />
                        </Paper>
                    </div>
                </div>
            );
        } else if(this.props.session.type == "admin") {
            return (
                <div>
                <Typography variant='h3'>
                    Welcome!
                </Typography>
                <hr/>
                <Typography variant='body1'>
                    To administrate this system, use the links on the left.
                </Typography>
                </div>
            )
        } else if(this.props.session.type == "guest") {
            return (
                <div>
                <Typography variant='h3'>
                    Welcome!
                </Typography>
                <hr/>
                <Typography variant='body1'>
                    To login to this system, use the button to the top right.
                </Typography>
                </div>
            )
        }
    }
}

const mapStateToProps = ({ loans: { loans }, equipment: { equipment }, login: { session }}: ApplicationState): IStateProps => ({ loans, equipment, session })

const mapDispatchToProps = (dispatch: Dispatch<LoanAction>) => {
    return {
        setLoans: bindActionCreators(setLoans, dispatch)
    }
}

export default withStyles(styles)(connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(DashboardView));