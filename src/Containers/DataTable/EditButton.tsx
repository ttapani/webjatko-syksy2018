import React from 'react';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
    onExecute: (event: React.MouseEvent<HTMLElement>) => void;
}

const styles = (theme: Theme) => createStyles({
    icon: {
        //marginLeft: theme.spacing.unit,
        fontSize: 20,
    }
});

const EditButton: React.SFC<IProps> = (props: IProps) => {
    return (
        <Tooltip title='Edit'>
            <IconButton onClick={props.onExecute}>
                <EditIcon className={props.classes.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default withStyles(styles)(EditButton);