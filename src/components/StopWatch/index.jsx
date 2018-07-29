import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import moment from 'moment'
import classNames from 'classnames';
import {CircularProgress} from '@material-ui/core';

class StopWatch extends Component {

    constructor(props) {
        super(props);
        this.checkActive = this.checkActive.bind(this);
        this.getTimeProgress = this.getTimeProgress.bind(this)
    }

    checkActive() {
        const {active, classes, seconds} = this.props;
        if (active) {
            return <h1 className={classes.progressTitle}>{moment.utc(seconds * 1000).format('mm:ss')}</h1>
        }
        return <h1 className={classNames(classes.progressTitle, classes.inactive)}>00:00</h1>
    }

    getTimeProgress() {
        const {seconds, total} = this.props;
        return round((seconds * 100) / total)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.simpleProgressCounterFullContainer}>
                <CircularProgress
                    className={classes.progressCircle}
                    thickness={2.2}
                    variant="static"
                    value={this.getTimeProgress()}
                />
                {this.checkActive()}
            </div>
        )
    }
}

const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

export default withStyles(Styles, {withTheme: true})(StopWatch);
