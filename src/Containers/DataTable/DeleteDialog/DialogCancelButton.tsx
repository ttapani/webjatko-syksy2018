import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing.unit,
        color: blue[700],
        borderColor: blue[800],
    },
    icon: {
        marginLeft: theme.spacing.unit,
        fontSize: 20,
    }
});

const DialogCancelButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Button variant='outlined' onClick={props.onExecute} className={props.classes.button}>
            Cancel
        </Button>
    );
};

export default withStyles(styles)(DialogCancelButton);