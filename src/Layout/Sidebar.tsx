import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme } from '@material-ui/core';
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
    root: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: {
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
            {/* <div className={classes.root}> */}
                <Hidden smDown={true} implementation="css" className={classes.root}>
                    <Drawer
                        variant="permanent"
                        classes={{ paper: classes.drawerPaper }}
                    >
                    <Divider />
                    {/* Weird interaction with spacers */}
                    <div className={classes.toolbar}/>
                    <List>{mainListItems}</List>
                    </Drawer>
                </Hidden>
                <Hidden mdUp={true} implementation="css">
                    <Drawer
                        variant="temporary"
                        open={this.props.mobileOpen}
                        anchor="left"
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}
                    >
                    <Divider />
                    {/* Weird interaction with spacers */}
                    <div className={classes.toolbar}/>
                    <List>{mainListItems}</List>
                    </Drawer>
                </Hidden>
            {/* </div> */}
            </>
        );
    }
}

export default withStyles(styles)(SideBar);