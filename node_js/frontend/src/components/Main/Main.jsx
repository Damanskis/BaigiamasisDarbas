import React, {useState} from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from '../../utils/history';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { logout } from '../../api';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto'
  },
}));


const Main = (props) =>{
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleClick = (link) =>{
      let lowerCaseLink = link.toLowerCase();
      if(link === "Dashboard"){
        history.push("/")
      } else {
        history.push(lowerCaseLink)
      }
    }

    const userLogout = async () => {
      await logout();
      history.push('/login')
    }

    return(
      <div className={classes.root}>
        <ToastContainer />
        <main className={`${classes.content} ${props.classes ? props.classes : ''}`}>
          <div>
            <Button sx={{marginLeft: "20px", marginRight: "20px"}} onClick={() =>  history.push("/")} variant="contained" size="small">Home</Button>
            <Button sx={{marginLeft: "20px", marginRight: "20px"}} onClick={() =>  history.push("/history")} variant="contained" size="small">Likes / Dislikes</Button>
            <Button sx={{marginLeft: "20px", marginRight: "20px"}} onClick={() =>  history.push("/myaccount")} variant="contained"size="small">Profile</Button>
            <Button sx={{marginLeft: "20px", marginRight: "20px"}} onClick={() =>  userLogout()} variant="contained"size="small">Logout</Button>
          </div>
          <div className={classes.toolbar} />
            {props.children}
        </main>
      </div>
    )
}

export default Main;