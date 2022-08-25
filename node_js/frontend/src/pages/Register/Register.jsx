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
import { registerUser } from '../../api';

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

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            city: "",
            gender: "",
            age: 0,
            error: ""
        }
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
            case 'confirmPassword':
                this.setState({confirmPassword: value})
                break;
            case 'city':
                this.setState({city: value})
                break;
            case "gender":
                this.setState({gender: value})
                break;
            case "age":
                this.setState({age: value})
                break;   
        }
    }

    registerUser = async (e) => {
        e.preventDefault();
        const {username, password, confirmPassword, city, gender, age} = this.state;
        if (password === confirmPassword) {
            const register = await registerUser({
                username, password, city, gender, age
            });
            console.log(register)
        } else {
            this.setState({
                error: "Passwords doesnt match"
            })
        }
    }
    
    render(){       
        const { classes } = this.props;
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
                                    Register
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
                                    <InputField 
                                        style="standard"
                                        id = "confirmPassword"
                                        label = "Confirm password"
                                        name = "confirmPassword"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.confirmPassword}
                                        type="password"
                                    />
                                      <InputField 
                                        style="standard"
                                        id = "city"
                                        label = "City"
                                        name = "city"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.city}
                                        type="text"
                                    />
                                    <InputField 
                                        style="standard"
                                        id = "gender"
                                        label = "Gender"
                                        name = "gender"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.gender}
                                        type="text"
                                    />
                                    <InputField 
                                        style="standard"
                                        id = "age"
                                        label = "Age"
                                        name = "age"
                                        fullWidth = { true }
                                        onChange={this.handleInput}
                                        value={this.state.age}
                                        type="text"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={(e)=>this.registerUser(e)}
                                        >
                                        Sign up
                                    </Button>
                                    <Grid container>
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                            {"Have an account? Sign in"}
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

export default withStyles(styles)(Register);
