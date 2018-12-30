import React from 'react';
import { WithStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {

}

interface IState {

}

const styles = (theme: Theme) => createStyles({
    
});

class DashboardView extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const { classes } = this.props;
        return (
            <Typography variant='h3'>
                Welcome!
            </Typography>
        );
    }
}

export default withStyles(styles)(DashboardView);