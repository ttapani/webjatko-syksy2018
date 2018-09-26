import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

interface IHeaderProps extends WithStyles<typeof styles> {

}

const styles = () => createStyles({
    root: {
        flexGrow: 1,
        paddingBottom: 70,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class Header extends React.Component<IHeaderProps, null> {
    constructor(props) {
        super(props);
    }
    
    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <ToolBar>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            webjatko18
                        </Typography>
                        <Link href="/countries">
                            <Button color="inherit">
                                Countries
                            </Button>
                        </Link>
                        <Link href="/clocks">
                            <Button color="inherit">
                                Clocks
                            </Button>
                        </Link>
                    </ToolBar>
                </AppBar>
            </div>
        );
    }
}
export default withStyles(styles)(Header);