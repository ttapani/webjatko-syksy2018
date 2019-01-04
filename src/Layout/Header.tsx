import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import { ApplicationState } from 'src/Store/store';
import { User, LoginState, LoginAction } from 'src/Store/login/types';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { logoutUser } from '../../src/Store/login/actions';
import Router from 'next/router';


interface IHeaderProps extends WithStyles<typeof styles> {
    title: string;
    handleMenuNuttonClick: () => void;
}

interface StateProps {
    user: User;
}

interface DispatchProps {
    logoutUser: () => Promise<void>;
}

type Props = StateProps & IHeaderProps & DispatchProps;

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
/*         [theme.breakpoints.up('md')]: {
            marginLeft: 12 + 24,
        }, */
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    userButton: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

class Header extends React.Component<Props, null> {
    constructor(props: Props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    private handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.logoutUser().then(() => {
            Router.push("/login");
        });
    }
    
    public render(): React.ReactNode {
        const { classes, title } = this.props;
        return (
            <AppBar position="absolute" className={classes.appBar}>
                <ToolBar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.handleMenuNuttonClick}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap={true} className={classes.title}>
                        {title}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.userButton}   
                    >
                        {this.props.user.userName}
                        <AccountCircle className={classes.rightIcon}/>
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.userButton}
                        onClick={this.handleLogout}
                    >
                        Logout                        
                    </Button>
                </ToolBar>
            </AppBar>
        );
    }
}

const mapStateToProps = ({ login: { user, isLoading, error }}: ApplicationState): StateProps => ({ user });
const mapDispatchToProps = (dispatch: ThunkDispatch<LoginState, undefined, LoginAction>, ownProps: IHeaderProps): DispatchProps => {
    return {
        logoutUser: async() => {
            await dispatch(logoutUser())
        }
    }
}

export default connect<StateProps, DispatchProps, IHeaderProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));

// export default withStyles(styles)(Header);