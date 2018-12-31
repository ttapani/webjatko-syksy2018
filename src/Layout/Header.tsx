import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';


interface IHeaderProps extends WithStyles<typeof styles> {
    title: string;
    handleMenuNuttonClick: () => void;
}

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

});

class Header extends React.Component<IHeaderProps, null> {
    constructor(props) {
        super(props);
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
                    <Typography variant="subtitle1" color="inherit" noWrap={true}>
                        Guest
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                </ToolBar>
            </AppBar>
        );
    }
}
export default withStyles(styles)(Header);