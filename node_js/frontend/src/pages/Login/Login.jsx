import React, {Fragment} from 'react';
import InputField from '../../components/InputField';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import './style.css';
import { Redirect } from 'react-router';
import { authorize } from '../../api';

const styles = theme => ({
    root: {
         height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            authorized: false,
            authAttempt: false
        }
    }

    checkAuth = async (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        let authorized = await authorize(username, password);
        this.setState({authorized, authAttempt: true});
    }

    handleInput = (e) => {
        const { value, name } = e.target;
        switch(name){
            case 'username':
                this.setState({username: value});
                break;
            case 'password':
                this.setState({password: value});
                break;
        }
    }
    
    render(){       
        const { classes } = this.props;
        const { authorized } = this.state;
        if(authorized){
            return <Redirect to="/" />
        }
        return(
            <Fragment>
                <div className="login-container">
                    <div className="login-wrapper">
                        <Grid container className={classes.root}>
                        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <form className={classes.form} >
                                    <InputField 
                                        style="standard"
                                        id="username"
                                        label = "Username"
                                        name = "username"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.username}
                                        type="text"
                                        error={this.checkusername}
                                    />
                                     <InputField 
                                        style="standard"
                                        id = "password"
                                        label = "Password"
                                        name = "password"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.password}
                                        type="password"
                                    />
        
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={(e)=>this.checkAuth(e)}
                                        >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Box mt={5}>
                                    </Box>
                                </form>
                            </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fragment>
        )
    } 
}

export default withStyles(styles)(Login);
