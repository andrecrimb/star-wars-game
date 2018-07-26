import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Styles} from "./styles";
import {connect} from 'react-redux'
import {compose} from 'redux'
// import TopBar from './containers/TopBar'
import CharactersList from './containers/CharactersList'
import {
    openToastAlert,
    fetchFilms,
} from '../../actions'
import _ from 'lodash'

class Board extends Component {

    componentWillMount() {
        if(_.isEmpty(this.props.films)){
            this.props.fetchFilms(() => {})
        }
    }
    
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {/*<TopBar/>*/}
                <div className={classes.fullBodyContainer}>
                    <CharactersList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // characters: state.characters.charactersList,
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {
        openToastAlert,
        fetchFilms,
    }),
)(Board);