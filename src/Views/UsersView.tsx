import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DataTable from '../Containers/DataTable/DataTable';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../Store/store';
import { User, UsersAction } from '../Store/users/types';
import { Session } from 'src/Store/login/types';
import Error from 'next/error'
import { addUsers, updateUsers, removeUsers } from '../Store/users/actions';

interface IProps extends WithStyles<typeof styles> {
}

interface IState {

}

interface StateProps {
    users: User[];
    session: Session;
}

interface DispatchProps {
    addUsers: (data: User[]) => void;
    updateUsers: (data: User[]) => void;
    removeUsers: (data: string[]) => void;
}

type Props = StateProps & IProps & DispatchProps;

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

class UsersView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    public render(): React.ReactNode {
        const { classes, users } = this.props;
        if(this.props.session.type != "admin") {
            return <Error statusCode={403} />;
        }
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
                                {   title: "Description",
                                    name: 'description',
                                },
                                {   title: "Password",
                                    name: 'password',
                                },
                            ]}
                            rows={users}
                            onRowsChanged={this.props.updateUsers}
                            onRowsAdded={this.props.addUsers}
                            onRowsDeleted={this.props.removeUsers}
                        />
                    </Paper>
            </div>
        );
    }
}

const mapStateToProps = ({ users: { users }, login: { session }}: ApplicationState): StateProps => ({ users, session })

const mapDispatchToProps = (dispatch: Dispatch<UsersAction>) => {
    return {
        addUsers: bindActionCreators(addUsers, dispatch),
        updateUsers: bindActionCreators(updateUsers, dispatch),
        removeUsers: bindActionCreators(removeUsers, dispatch),
    }
}

export default withStyles(styles)(connect<StateProps, DispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(UsersView));
