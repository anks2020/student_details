import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';

// import { Router,Link } from 'react-router-dom';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
                <a href="/dashboard" style={{textDecoration:"none", color:"black"}}>
                    <ListItem button key="dashboard">
                        <ListItemIcon><DashboardIcon/></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem> 
                </a>
                <a href ="/marks" style={{textDecoration:"none", color:"black"}}>
                    <ListItem button key="fillmarks">
                        <ListItemIcon><CreateIcon/></ListItemIcon>
                        <ListItemText primary="Fill Marks" />
                    </ListItem>
                </a>
                <a href="/profile" style={{textDecoration:"none", color:"black"}}>
                    <ListItem button key="profile">
                        <ListItemIcon><PersonIcon/></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem> 
                </a>
                
            {/* {['FillMarks', 'Dashboard', 'Profile'].map((text, index) => (
                // {text=='Dashboard'?<Link to="/dashboard" />:(text=='FillMarks')?<CreateIcon/>:<PersonIcon/>} 
            //   <ListItem button key={text}>
            //     <ListItemIcon>
            //     {text==='Dashboard'?<DashboardIcon/>:(text=='FillMarks')?<CreateIcon/>:<PersonIcon/>}
            //     </ListItemIcon>
            //     <ListItemText primary={text} />
            //   </ListItem>
            //   </Link>
            
            ))} */}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        
      </main>
    </div>
  );
}
