import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuItem from './MenuItem';

const mainListItems = (
  <div>
     <MenuItem href={'/'}>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </MenuItem>
    <MenuItem href={'/loans'}>
        <ListItemIcon>
            <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText primary="Loans" />
    </MenuItem>
    <MenuItem href={'/equipments'}>
        <ListItemIcon>
            <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Equipments" />
    </MenuItem>
  </div>
);

export default mainListItems;