import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import { Tooltip } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

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

const CancelButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Tooltip title='Cancel'>
            <IconButton onClick={props.onExecute} className={props.classes.button}>
                <CancelIcon className={props.classes.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default withStyles(styles)(CancelButton);