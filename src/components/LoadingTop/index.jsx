import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {
    LinearProgress
} from '@material-ui/core';

class LoadingTop extends Component {
    render() {
        const {classes, color, display} = this.props;

        return (
            <LinearProgress
                color={color}
                className={classNames(
                    display ? '' : classes.loading
                )}
            />
        )
    }
}

export default withStyles(Styles, {withTheme: true})(LoadingTop);