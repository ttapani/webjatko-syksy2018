import React from 'react';
import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DataTable from '../Containers/DataTable/DataTable';

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { setUsers } from '../Store/users/actions';
import { ApplicationState } from '../Store/store';
import { UserState, User, UserAction } from '../Store/users/types';

interface IProps extends WithStyles<typeof styles> {
    users: User[];
    setUsers: (data) => void;
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

    setUsers = (data) => {
        this.props.setUsers(data);
    }

    public render(): React.ReactNode {
        const { classes, users } = this.props;
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
                            onRowsChange={this.setUsers}
                        />
                    </Paper>
            </div>
        );
    }
}

const mapStateToProps = ({ users: { users }}: ApplicationState): UserState => ({ users })

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => {
    return {
        setUsers: bindActionCreators(setUsers, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UsersView));
