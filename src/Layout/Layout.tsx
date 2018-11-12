import React from 'react';
import Head from 'next/head';
import Header from './Header';
import SideBar from './Sidebar';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Router, { withRouter, SingletonRouter } from 'next/router';

interface ILayoutProps extends WithStyles<typeof styles> {
    title?: string;
    router?: SingletonRouter;
}

interface ILayoutState {
    mobileOpen: boolean;
}

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class Layout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
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

export default withRouter(withStyles(styles)(Layout));