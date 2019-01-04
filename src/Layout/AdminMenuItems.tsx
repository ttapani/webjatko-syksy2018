import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MenuItem from './MenuItem';

const AdminMenuItems = (
  <div>
    <MenuItem href={'/users'}>
        <ListItemIcon>
            <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
    </MenuItem>
  </div>
);

export default AdminMenuItems;