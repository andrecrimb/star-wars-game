import React from 'react'
import {Grid, TextField} from '@material-ui/core';
import _ from 'lodash'

export default (props) => {
    const {
        input,
        label,
        xs,
        sm,
        required,
        type,
        ishidden,
        errormessage,
        ...custom,
    } = props;

    return (
        <Grid style={ishidden ? {display: 'none'} : {}} item xs={xs} sm={sm}>
                <TextField
                    label={label}
                    type={type}
                    required={required}
                    fullWidth
                    helperText={errormessage ? _.map(errormessage, (erro,index) => {
                        if(errormessage[1] && index !== errormessage.length-1){
                            return erro + " / "
                        }
                        else{
                            return erro
                        }
                    }) : ''}
                    error={!_.isEmpty(errormessage)}
                    {...input}
                    {...custom}
                />
        </Grid>
    )
};
