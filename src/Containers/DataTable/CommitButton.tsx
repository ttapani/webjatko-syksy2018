import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import { Tooltip } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    button: {
        color: green[700],
    },
    icon: {
        //marginLeft: theme.spacing.unit,
        fontSize: 20,
    }
});

const CommitButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Tooltip title='Done'>
            <IconButton onClick={props.onExecute} className={props.classes.button}>
                <DoneIcon className={props.classes.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default withStyles(styles)(CommitButton);