import React from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBar from './Sidebar';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Router, { withRouter, SingletonRouter } from 'next/router';
import { refreshUser } from '../Store/login/actions';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { LoginAction, LoginState } from 'src/Store/login/types';

interface ILayoutProps extends WithStyles<typeof styles> {
    title?: string;
    router: SingletonRouter;
}

interface ILayoutState {
    mobileOpen: boolean;
}

interface StateProps {
}

interface DispatchProps {
    refreshUser: () => Promise<void>;
}

type IProps = StateProps & ILayoutProps & DispatchProps;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

class Layout extends React.Component<IProps, ILayoutState> {
    constructor(props: IProps) {
        super(props);
        this.state = { mobileOpen: false };
    }

    componentDidMount() {
        console.log('layout mounted');

        // Router, not router
        Router.onRouteChangeStart = (url) => {
            console.log(`loading started + ${url}`);
        };

        Router.onRouteChangeComplete = () => {
            console.log('loading finished');
        };

        Router.onRouteChangeError = () => {
            console.log('error at loading page');
        };

        this.props.refreshUser().catch(() => {
            console.log("no user to refresh");
        });
    }

    public render(): React.ReactNode {
        const { classes, title, children } = this.props;
        return (
            <div className={classes.root}>
                <Head>
                    <title>{title}</title>
                </Head>
                <Header
                    title={title || ''}
                    handleMenuNuttonClick={() => this.setState({ ...this.state, mobileOpen: !this.state.mobileOpen})}
                />
                <ClickAwayListener onClickAway={() => this.setState({ ...this.state, mobileOpen: false })}>
                    <SideBar mobileOpen={this.state.mobileOpen}/>
                </ClickAwayListener>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    {children}
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<LoginState, undefined, LoginAction>, ownProps: ILayoutProps): DispatchProps => {
    return {
        refreshUser: async() => {
            await dispatch(refreshUser())
        }
    }
}

export default withRouter(withStyles(styles)(connect(null, mapDispatchToProps)((Layout))));