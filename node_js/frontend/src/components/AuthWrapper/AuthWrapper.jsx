import React from 'react';
import {Redirect} from 'react-router-dom';

export default function(ComposedComponent){
    return class extends React.Component{
        render(){
            const authorized = !!localStorage.getItem('token');
            if(!authorized){
                return <Redirect to="/login" />
            }
            return <ComposedComponent {...this.props} />
        }
    }
}