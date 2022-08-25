import React, {Fragment} from 'react';
import { Router, Switch, Route } from  'react-router-dom';
import history from '../utils/history';
import secure from "./AuthWrapper";

//Material UI components
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

//Root
import Root from './Root';

//Pages
import Login from '../pages/Login';
import Register from '../pages/Register';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    }
  }
));

const App = () =>{
    const classes = useStyles();
    return(
        <Fragment>
          <Router history={history}>
            <CssBaseline />
                <div className={classes.root}>
                  <Switch>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register} />
                    <Route component = { secure(Root) } />
                  </Switch>
                </div>
          </Router>
        </Fragment>
    )
}

export default App;