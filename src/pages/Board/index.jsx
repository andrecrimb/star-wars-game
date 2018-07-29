import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Styles} from "./styles";
import {connect} from 'react-redux'
import {compose} from 'redux'
import TopBar from './containers/TopBar'
import CharactersList from './containers/CharactersList'
import {
    openToastAlert,
    fetchFilms,
} from '../../actions'
import _ from 'lodash'
import CharacterDetailsModal from './containers/CharacterDetailsModal'
import EndQuizModal from './containers/EndQuizModal'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {modalOpen: false};
    }

    componentWillMount() {
        if (_.isEmpty(this.props.films)) {
            this.props.fetchFilms(() => {})
        }
    }

    handleClickOpen = () => {
        this.setState({modalOpen: true});
    };

    handleClickClose = () => {
        this.setState({modalOpen: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <div className={classes.root}>
                    <TopBar/>
                    <CharacterDetailsModal
                        modalClose={this.handleClickClose}
                        modalOpen={this.state.modalOpen}
                    />
                    <EndQuizModal history={this.props.history}/>
                    <div className={classes.fullBodyContainer}>
                        <CharactersList
                            onClickItem={this.handleClickOpen}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(null, {
        openToastAlert,
        fetchFilms,
    }),
)(Board);