import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    icon: {
        fontSize: 20,
    }
});

const AddButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Tooltip title='Add'>
            <IconButton onClick={props.onExecute} color='primary'>
                <AddIcon className={props.classes.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default withStyles(styles)(AddButton);