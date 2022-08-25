import React, {Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import './style.css';

const InputField = (props) =>{
    return(
        <Fragment>
            <TextField
                id={`${props.style}-basic ${props.id}`}
                name = {props.name}
                className = {props.name}
                fullWidth = {props.fullWidth}
                onChange = {props.onChange}
                label = {props.label}
                type = {props.type}
                value = {props.value}
                error = {props.error}
                helperText= {props.helper}
                variant={props.style}
                size="medium"
                required={props.required}
                multiline={props.multiline}
                rows="5"
                />
        </Fragment>
    )
}

export default InputField;