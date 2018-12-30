import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    button: {
        margin: theme.spacing.unit,
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[900],
        }
    },
    icon: {
        marginLeft: theme.spacing.unit,
    }
});

const DialogDeleteButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Button variant='contained' onClick={props.onExecute} color='primary' className={props.classes.button}>
            Delete
            <DeleteIcon className={props.classes.icon}/>
        </Button>
    );
};

export default withStyles(styles)(DialogDeleteButton);