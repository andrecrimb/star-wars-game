import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'redux'
import {
    Typography,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import StopWatch from '../../../../components/StopWatch'
import Loading from '../../../../components/LoadingTop'
import moment from 'moment'
import {gameStartToggle, gameCompleted} from "../../../../actions";

class TopBar extends Component {

    constructor(props) {
        super(props);
        this.runStopWatch = this.runStopWatch.bind(this);
        this.state = {
            stopWatchValue: 120,
            intervalId: null
        }
    }

    runStopWatch() {
        this.setState({stopWatchValue: moment.duration(this.state.stopWatchValue, 's').asSeconds()});
        const stopWatchLoop = setInterval(() => {
            if (this.props.gameSettings.started) {
                this.setState({stopWatchValue: moment.duration(this.state.stopWatchValue, 's').subtract(1, 's').asSeconds()});
            }
        }, 1000);
        this.setState({
            ...this.state,
            intervalId: stopWatchLoop
        })
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.gameSettings){
            if (prevProps.gameSettings.started !== this.props.gameSettings.started) {
                if (this.props.gameSettings.started) {
                    this.runStopWatch()
                }
            }
            if(prevState.stopWatchValue !== this.state.stopWatchValue){
                if(this.state.stopWatchValue === 0){
                    clearInterval(this.state.intervalId);
                    this.props.gameStartToggle(false);
                    this.props.gameCompleted(true)
                }
            }
        }
    }

    render() {
        const {classes, gameSettings} = this.props;

        return (
            <AppBar position="absolute" className={classes.root}>
                <Toolbar classes={{root: classes.toolbar}}>
                    <img className={classes.navIcon} src={`images/logo.png`} alt=""/>
                    <Typography variant="title" className={classes.flex} color="inherit" noWrap>
                        Star Quiz
                    </Typography>
                    <StopWatch
                        active={gameSettings.started}
                        total={120}
                        seconds={this.state.stopWatchValue}
                    />
                </Toolbar>
                <Loading
                    display={this.props.loading !== 0}
                    color="primary"
                />
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.systemSettings.countLoadingRequest,
        gameSettings: state.gameSettings
    }
};

export default compose(
    withRouter,
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {gameStartToggle, gameCompleted})
)(TopBar);
