import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { ApplicationState } from '../Store/store';
import { Session } from 'src/Store/login/types';
import Error from 'next/error'
import LoansTable from '../Containers/LoansTable';

interface IProps extends WithStyles<typeof styles> {
}

interface IStateProps {
    session: Session;
}

interface IDispatchProps {
}

interface IState {
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

class LoansView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    public render(): React.ReactNode {
        if(this.props.session.type == "guest") {
            return <Error statusCode={403} />;
        } else {
            return <LoansTable />
        }

    }
}

const mapStateToProps = ({ login: { session }}: ApplicationState): IStateProps => ({ session })

export default withStyles(styles)(connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, null)(LoansView));
