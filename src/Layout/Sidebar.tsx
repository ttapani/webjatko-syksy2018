import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme, Typography, ListItemIcon, ListItemText } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import mainListItems from './MenuItems';
import Hidden from '@material-ui/core/Hidden';
import AdminMenuItems from './AdminMenuItems';
import { Session } from 'src/Store/login/types';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/Store/store';
import MenuItem from './MenuItem';

import PersonIcon from '@material-ui/icons/Person';

interface ISidebarProps extends WithStyles<typeof styles> {
    mobileOpen: boolean;
}

interface ISidebarState {
    mobileOpen: boolean;
}

interface StateProps {
    session: Session;
}

type Props = StateProps & ISidebarProps;

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
    drawer: {
        [theme.breakpoints.up('md')]: {
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

class SideBar extends React.Component<Props, ISidebarState> {
    constructor(props: Props) {
        super(props);
        this.state = { mobileOpen: this.props.mobileOpen };
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        let adminMenu;
        if(this.props.session.type == "admin") {
            adminMenu =    <MenuItem href={'/users'}>
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </MenuItem>;
        }
        else {
            adminMenu = <Divider />
        }

        return (
            <>
            <div className={classes.drawer}>
                <Hidden smDown={true} implementation="css">
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
                    <Divider /> 
                    {adminMenu}
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
                    <div className={classes.toolbar}>
                        <Typography variant="h6">
                                Loan system
                        </Typography>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider /> 
                    {adminMenu}
                    </Drawer>
                </Hidden>
            </div>
            </>
        );
    }
}

const mapStateToProps = ({ login: { session }}: ApplicationState): StateProps => ({ session });

export default connect<StateProps, null, ISidebarProps>(mapStateToProps, null)(withStyles(styles)(SideBar));
