import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import { Tooltip } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    button: {
        color: red[700],
    },
    icon: {
        //marginLeft: theme.spacing.unit,
        fontSize: 20,
    }
});

const DeleteButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Tooltip title='Delete'>
            <IconButton onClick={props.onExecute} color='primary' className={props.classes.button}>
                <DeleteIcon className={props.classes.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default withStyles(styles)(DeleteButton);