import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
});

interface IProps extends WithStyles<typeof styles> {

}

interface StateProps {
    user: User;
    isLoading: Boolean;
    error: String;
}

interface DispatchProps {
    loginUser: (credentials: UserCredentials) => void;
}

type Props = StateProps & IProps & DispatchProps;

const LoginPage: React.SFC<Props> = (props: Props) => {
    const { classes } = props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} method="POST">
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
{/*             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => { event.preventDefault(); console.log("login clicked"); props.loginUser({ userName: "xd", password: "xdd" }) }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </main>
    );
}

const mapStateToProps = ({ login: { user, isLoading, error }}: ApplicationState): StateProps => ({ user, isLoading, error })

const mapDispatchToProps = (dispatch: ThunkDispatch<LoginState, undefined, LoginAction>, ownProps: IProps): DispatchProps => {
    return {
        loginUser: async(credentials: UserCredentials) => {
            await dispatch(loginUser(credentials))
            console.log("login completed")
        }
    }
}

export default connect<StateProps, DispatchProps, IProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));

//export default withStyles(styles)(LoginPage);