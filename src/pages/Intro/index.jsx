import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Styles} from './styles'
import {withStyles} from "@material-ui/core/styles";
import {SYSTEM_ROUTES} from "../../constants";
import {fetchFilms} from "../../actions";
import {
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from '@material-ui/core';
import {Grade as GradeIcon, Star as StarIcon} from '@material-ui/icons';
import ScoresModal from './components/ScoresModal'
import {getScoreFromLocalStorage} from "../../services";
import _ from 'lodash'


class Intro extends Component {

    constructor(props) {
        super(props);
        this.playGame = this.playGame.bind(this);
        this.state = {modalOpen: false};

    }

    componentWillMount() {
        this.props.fetchFilms(() => {
        })
    }

    handleClickOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClickClose = () => {
        this.setState({modalOpen: false});
    };


    playGame() {
        this.props.history.push(SYSTEM_ROUTES.board.routeTo)
    }

    renderScoreButton() {
        const scores = getScoreFromLocalStorage();
        const {classes} = this.props;

        if (!_.isEmpty(scores)) {
            return (
                <Button className={classes.flatBtn} onClick={this.handleClickOpen}>
                    <GradeIcon className={classes.scoreIcon}/>
                    Scores
                </Button>
            )
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.loginIndex}>
                <ScoresModal
                    modalClose={this.handleClickClose}
                    modalOpen={this.state.modalOpen}
                />
                <Grid container direction="row" alignItems="center" justify="center">
                    <Grid item xs={12}>
                        <Card className={classes.cardLogin}>
                            <CardContent className={classes.root}>
                                <div className={classes.formHeader}>
                                    <img alt="logo" className={classes.imageHeader}
                                         src="images/logo.png"/>
                                </div>

                                <div className={classes.rulesContainer}>
                                    <h4 className={classes.titleIntro}>Do you know the names of the characters in Star Wars?<br/>
                                        Yes? So see for yourself</h4>
                                    <List component="nav">
                                        <ListItem>
                                            <ListItemIcon>
                                                <StarIcon/>
                                            </ListItemIcon>
                                            <ListItemText inset primary="10 points for each character that hits, if you have not
                                        consulted the details of it."/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <StarIcon/>
                                            </ListItemIcon>
                                            <ListItemText inset primary="5 points for each character that hits and has consulted
                                        the details of it."/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <StarIcon/>
                                            </ListItemIcon>
                                            <ListItemText inset primary="You can make as many mistakes as you want, without
                                        affecting your score."/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <StarIcon/>
                                            </ListItemIcon>
                                            <ListItemText inset primary="It is not allowed to respond more than once to the same
                                        character."/>
                                        </ListItem>
                                    </List>
                                </div>

                                <div className={classes.actionContainer}>
                                    <Button
                                        onClick={this.playGame}
                                        className={classes.playButton}
                                        variant="raised"
                                        color="primary"
                                    >
                                        Play!
                                    </Button>
                                    <br/><br/>
                                    {this.renderScoreButton()}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(null, {fetchFilms}),
    withRouter,
)(Intro)