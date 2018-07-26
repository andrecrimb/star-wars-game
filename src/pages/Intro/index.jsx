import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Styles} from './styles'
import {SYSTEM_ROUTES} from "../../constants";
import {fetchFilms} from "../../actions";
import {
    Card,
    CardContent,
    Grid,
    Button,
} from '@material-ui/core';

class Intro extends Component {

    constructor(props) {
        super(props);
        this.playGame = this.playGame.bind(this)
    }

    componentWillMount(){
        this.props.fetchFilms(() => {})
    }

    playGame() {
        this.props.history.push(SYSTEM_ROUTES.board.routeTo)
    }

    render() {
        return (
            <div style={Styles.loginIndex}>
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Card style={Styles.cardLogin}>
                            <CardContent>
                                <div style={Styles.formHeader}>
                                    <img alt="logo" style={Styles.imageHeader}
                                         src="https://png.icons8.com/color/1600/star-wars.png"/>
                                </div>
                                <br/><br/>
                                <div style={Styles.actionContainer}>
                                    <Button
                                        onClick={this.playGame}
                                        style={Styles.playButton}
                                        variant="raised"
                                        color="primary"
                                    >
                                        Jogar!
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loading: state.systemSettings.countLoadingRequest
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {fetchFilms}),
)(Intro)