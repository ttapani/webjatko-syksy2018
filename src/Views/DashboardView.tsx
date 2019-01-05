import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/Store/store';
import { Session } from 'src/Store/login/types';
import LoansTable from '../Containers/LoansTable';

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
}

interface IStateProps {
    session: Session;
}

interface IDispatchProps {
}

type Props = IProps & IStateProps & IDispatchProps;

const styles = (theme: Theme) => createStyles({
    table: {
        marginTop: theme.spacing.unit,
    },
});

class DashboardView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    public render(): React.ReactNode {
        if(this.props.session.type == "normal") {
            return (
                <div>
                <Typography variant='h3'>
                    Welcome!
                </Typography>
                <hr/>
                <Typography variant='body1'>
                    Here are loans associated with you.
                </Typography>
                <div className={this.props.classes.table}>
                    <LoansTable />
                </div>
                </div>
            )
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

const mapStateToProps = ({ login: { session }}: ApplicationState): IStateProps => ({ session })

export default withStyles(styles)(connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, null)(DashboardView));