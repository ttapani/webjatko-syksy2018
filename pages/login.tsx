import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'
import { loginUser } from '../src/Store/login/actions';
import { ApplicationState } from '../src/Store/store';
import { User, UserCredentials, LoginAction, LoginState } from '../src/Store/login/types';
import { ThunkDispatch } from 'redux-thunk';
import grey from '@material-ui/core/colors/grey';

import Router from 'next/router'
import { CircularProgress, Snackbar } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: grey[700]
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    loading: {
        margin: theme.spacing.unit * 2,
    },
    notLoading: {
        margin: theme.spacing.unit * 2,
        visibility: "hidden",
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

interface IProps extends WithStyles<typeof styles> {

}

interface IState {
    email: string;
    password: string;
    errorOccured: boolean;
}

interface StateProps {
    user: User;
    isLoading: boolean;
    error?: string;
}

interface DispatchProps {
    loginUser: (credentials: UserCredentials) => Promise<void>;
}

type Props = StateProps & IProps & DispatchProps;

class LoginPage extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleErrorClose = this.handleErrorClose.bind(this);
        this.onErrorClosed = this.onErrorClosed.bind(this);
        this.state = { email: "", password: "", errorOccured: false };
    }

    private onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: event.target.value });
    }

    private onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    private handleLogin(event: React.MouseEvent<HTMLElement>) {
        const { email, password } = this.state;
        const { error } = this.props;
        event.preventDefault();
        this.setState({ errorOccured: false });
        console.log("login clicked");
        this.props.loginUser({ userName: email, password: password }).then(() => {
            console.log("login succesful")
            Router.push("/");
        }).catch(() => {
            console.log("login failed, reason: " + error);
            this.setState({ errorOccured: true });
        });
    }

    private handleErrorClose(event: React.MouseEvent<HTMLElement>, reason: string) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ errorOccured: false });
    }

    private onErrorClosed(event: React.MouseEvent<HTMLElement>) {
        this.setState({ errorOccured: false });
    }

    public render(): React.ReactNode {
      const { classes, isLoading } = this.props;
      const { email, password } = this.state;

      return (
        <main className={classes.main}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.state.errorOccured}
                autoHideDuration={4000}
                onClose={this.handleErrorClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.error}</span>}
            />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <CircularProgress className={isLoading ? classes.loading : classes.notLoading} />
                <form className={classes.form} method="POST">
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input disabled={isLoading} id="email" name="email" autoComplete="email" autoFocus value={email} onChange={this.onEmailChange} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={this.onPasswordChange} />
                    </FormControl>
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleLogin}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </main>
      );
    }
}

const mapStateToProps = ({ login: { user, isLoading, error }}: ApplicationState): StateProps => ({ user, isLoading, error })

const mapDispatchToProps = (dispatch: ThunkDispatch<LoginState, undefined, LoginAction>, ownProps: IProps): DispatchProps => {
    return {
        loginUser: async(credentials: UserCredentials) => {
            await dispatch(loginUser(credentials))
        }
    }
}

export default connect<StateProps, DispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));