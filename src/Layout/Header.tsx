import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


interface IHeaderProps extends WithStyles<typeof styles> {
    title: string;
    handleMenuNuttonClick: () => void;
}

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            marginLeft: 12 + 24,
        },
    },
    menuButton: {
        marginLeft: 12,
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
                <ToolBar disableGutters={true}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.handleMenuNuttonClick}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" noWrap={true} className={classes.title}>
                        {title}
                    </Typography>
                </ToolBar>
            </AppBar>
        );
    }
}
export default withStyles(styles)(Header);