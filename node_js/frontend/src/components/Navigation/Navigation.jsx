import React, {Fragment} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../api';
import history from '../../utils/history';

import './style.css';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
      inline: {
    display: 'inline',
  },
  }));

const Navigation = (props) => {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();

    const userLogout = async () => {
      await logout();
      history.push('/login')
    }

    const username = atob(localStorage.getItem('token')).split(":")[0]

    return(
      <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                classes={{paper: classes.drawerPaper,}}
                ModalProps={{keepMounted: true,}}>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
                classes={{paper: classes.drawerPaper,}}
                variant="permanent"
                open>
                {props.children}
                <div className="user-box">
                  <ListItem className="user" alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={username}
                      secondary={
                        <Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                             <IconButton 
                              aria-label="Logout" 
                              style={{ float:"right" }} 
                              className={classes.margin} 
                              size="small"
                              onClick={() => userLogout()}
                              >
                              <ExitToAppIcon fontSize="inherit" />
                            </IconButton>
                          </Typography>
                        </Fragment>
                      }
                    />
                  </ListItem>
                </div>
            </Drawer>
          </Hidden>
      </nav>
    )
}

export default Navigation;