import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import mainListItems from './MenuItems';
import Hidden from '@material-ui/core/Hidden';

interface ISidebarProps extends WithStyles<typeof styles> {
    mobileOpen: boolean;
}

interface ISidebarState {
    mobileOpen: boolean;
}

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 16px',
        ...theme.mixins.toolbar,
    },
});

class SideBar extends React.Component<ISidebarProps, ISidebarState> {
    constructor(props: ISidebarProps) {
        super(props);
        this.state = { mobileOpen: this.props.mobileOpen };
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <>
            <div className={classes.drawer}>
                <Hidden xsDown={true} implementation="css" className={classes.root}>
                    <Drawer
                        variant="permanent"
                        classes={{ paper: classes.drawerPaper }}
                        open={true}
                    >
                    <div className={classes.toolbar}>
                        <Typography variant="h6">
                                Loan system
                        </Typography>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    </Drawer>
                </Hidden>
                <Hidden smUp={true} implementation="css">
                    <Drawer
                        variant="temporary"
                        open={this.props.mobileOpen}
                        anchor="left"
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}
                    >
                    <div className={classes.toolbar}>
                        <Typography variant="h6">
                                Loan system
                        </Typography>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    </Drawer>
                </Hidden>
            </div>
            </>
        );
    }
}

export default withStyles(styles)(SideBar);