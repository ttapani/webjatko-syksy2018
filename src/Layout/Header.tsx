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
import { Session, LoginState, LoginAction } from 'src/Store/login/types';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { logoutUser } from '../../src/Store/login/actions';
import Router from 'next/router';


interface IHeaderProps extends WithStyles<typeof styles> {
    title: string;
    handleMenuNuttonClick: () => void;
}

interface StateProps {
    session: Session;
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
        this.handleProfileClicked = this.handleProfileClicked.bind(this);
    }

    private handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.logoutUser().then(() => {
            Router.push("/");
        });
    }

    private handleLogin(event: React.MouseEvent<HTMLButtonElement>) {
        Router.push("/login");
    }

    private handleProfileClicked(event: React.MouseEvent<HTMLButtonElement>) {
        Router.push("/profile");
    }
    
    public render(): React.ReactNode {
        const { classes, title } = this.props;
        let loginStateButton;

        if(this.props.session.type != "guest") {
            loginStateButton = <Button color="inherit" className={classes.userButton} onClick={this.handleLogout}>Logout</Button>;
        } else {
            loginStateButton = <Button color="inherit" className={classes.userButton} onClick={this.handleLogin}>Login</Button>;
        }

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
                        disabled={this.props.session.type == "guest"}
                        onClick={this.handleProfileClicked}
                    >
                        {this.props.session.userName}
                        <AccountCircle className={classes.rightIcon}/>
                    </Button>
                    {loginStateButton}
                </ToolBar>
            </AppBar>
        );
    }
}

const mapStateToProps = ({ login: { session }}: ApplicationState): StateProps => ({ session });
const mapDispatchToProps = (dispatch: ThunkDispatch<LoginState, undefined, LoginAction>, ownProps: IHeaderProps): DispatchProps => {
    return {
        logoutUser: async() => {
            await dispatch(logoutUser())
        }
    }
}

export default withStyles(styles)(connect<StateProps, DispatchProps, IHeaderProps>(mapStateToProps, mapDispatchToProps)(Header));

// export default withStyles(styles)(Header);