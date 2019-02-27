import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/Store/store';
import { Session } from 'src/Store/login/types';
import Error from 'next/error'
import { User } from 'src/Store/users/types';

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
}

interface IStateProps {
    session: Session;
    users: User[];
}

interface IDispatchProps {
}

type Props = IProps & IStateProps & IDispatchProps;

const styles = (theme: Theme) => createStyles({
    content: {
        marginTop: theme.spacing.unit,
    },
});

class ProfileView extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.getCurrentUserProfile = this.getCurrentUserProfile.bind(this);
    }

    private getCurrentUserProfile() {
        return this.props.users.filter(user => user.id == this.props.session.userId)[0];
    }

    public render(): React.ReactNode {
        if(this.props.session.type == "guest") {
            return <Error statusCode={403} />;
        } else {
            let profile = this.getCurrentUserProfile();
            return (
            <div>
                <Typography variant='h3'>
                    {profile.name}
                </Typography>
                <hr/>
                <ul className={this.props.classes.content}>
                    <li><Typography variant='body1'>Email: {profile.email}</Typography></li>
                    <li><Typography variant='body1'>Description: {profile.description}</Typography></li>
                </ul>
            </div>
            );
        }
    }
}

const mapStateToProps = ({ users: { users }, login: { session }}: ApplicationState): IStateProps => ({ users, session })

export default withStyles(styles)(connect<IStateProps, IDispatchProps, IProps>(mapStateToProps, null)(ProfileView));