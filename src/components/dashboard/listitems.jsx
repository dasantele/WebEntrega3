import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const mainListItems = ({dashboardAction, addPublicacionAction}) => (
  <div>
    <ListItem button onClick={dashboardAction}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={addPublicacionAction}>
      <ListItemIcon>
        <PostAddIcon />
      </ListItemIcon>
      <ListItemText primary="Crear publicacion" />
    </ListItem>
  </div>
);

export const secondaryListItems = (logoutAction) => (
  <div>
    <ListSubheader inset>Cerrar sesión</ListSubheader>
    <ListItem button onClick={logoutAction}>
      <ListItemIcon>
        <MeetingRoomIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar sesión" />
    </ListItem>
  </div>
);