import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import _ from 'lodash'
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    DialogTitle,
    Grid,
} from '@material-ui/core';
import {compose} from "redux";
import {CircularProgress} from '@material-ui/core';


class CharacterDetailsModal extends Component {

    constructor(props) {
        super(props);
        this.modalClose = this.modalClose.bind(this);
        this.renderMovies = this.renderMovies.bind(this);
        this.renderVehicles = this.renderVehicles.bind(this);
        this.renderPlanet = this.renderPlanet.bind(this);
        this.renderSpecies = this.renderSpecies.bind(this);
    }


    modalClose() {
        this.props.modalClose()
    }

    renderMovies() {
        const {characterSelected, films} = this.props;
        if (_.isEmpty(characterSelected)) {
            return null
        }
        return _.map(characterSelected.films, (film, index) => {
            if (index < (characterSelected.films.length - 1)) {
                return `${films[film].title}, `
            }
            return `${films[film].title}.`
        })
    }

    renderSpecies() {
        const {characterInteracted, classes} = this.props;
        if (_.isEmpty(characterInteracted) || _.isEmpty(characterInteracted.species)) {
            return <CircularProgress className={classes.circleProgress}/>
        }

        return _.map(characterInteracted.species, (specie, index) => {
            if (index < (characterInteracted.species.length)) {
                return `${specie}, `
            }
            return `${specie}.`
        })
    }

    renderPlanet() {
        const {characterInteracted, classes} = this.props;
        if (_.isEmpty(characterInteracted) || _.isEmpty(characterInteracted.homeworld)) {
            return <CircularProgress className={classes.circleProgress}/>
        }
        return characterInteracted.homeworld;
    }

    renderVehicles() {
        const {characterInteracted, classes} = this.props;
        if (_.isEmpty(characterInteracted) || _.isEmpty(characterInteracted.vehicles)) {
            return null
        }

        return (
            <div className={classes.section}>
                <h3 className={classes.sectionDetailsH3Bottom}>
                    <span className={classes.sectionDetailsSpan}>Vehicles:
                        {_.map(characterInteracted.vehicles, (vehicle, index) => {
                            if (index < (characterInteracted.vehicles.length)) {
                                return `${vehicle}, `
                            }
                            return `${vehicle}.`
                        })}
                        </span>
                </h3>
            </div>
        )
    }

    render() {
        const {
            classes,
            modalOpen,
            characterImage,
            characterSelected,
        } = this.props;
        return (
            <Dialog
                fullWidth
                open={modalOpen}
                onClose={this.modalClose}
                aria-labelledby="characters-details"
            >
                <DialogTitle id="characters-details">Details</DialogTitle>
                <DialogContent className={classes.root}>
                    <div>
                        <div className={classes.sectionInner}>
                            <div className={classes.characterImage}
                                 style={{background: `url(${characterImage}) top center`}}>
                            </div>
                            <div className={classes.sectionDetails}>
                                <h3 className={classes.sectionDetailsH3}>
                                    <span className={classes.sectionDetailsSpan}>Specie:</span> {this.renderSpecies()}
                                </h3>
                                <h3 className={classes.sectionDetailsH3}>
                                    <span
                                        className={classes.sectionDetailsSpan}>Height:</span> {characterSelected ? characterSelected.height : ''}
                                </h3>
                                <h3 className={classes.sectionDetailsH3}>
                                    <span
                                        className={classes.sectionDetailsSpan}>Hair:</span> {characterSelected ? characterSelected.skin_color : ''}
                                </h3>
                                <h3 className={classes.sectionDetailsH3}>
                                    <span
                                        className={classes.sectionDetailsSpan}>Planet:</span> {this.renderPlanet()}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.sectionDetailsH3Bottom}>
                            <span className={classes.sectionDetailsSpan}>Movies: </span> {this.renderMovies()}
                        </h3>
                    </div>
                    {this.renderVehicles()}
                </DialogContent>

                <DialogActions>
                    <Button
                        type="submit"
                        color="primary"
                        autoFocus
                        onClick={() => this.modalClose()}
                        className={classes.buttonClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        characterImage: state.charactersImages[state.characters.charactersSelected] ? state.charactersImages[state.characters.charactersSelected] : '',
        characterSelected: state.characters.charactersSelected ? state.characters.charactersList[state.characters.charactersSelected] : {},
        characterInteracted: state.characters.charactersInteracted ? state.characters.charactersInteracted[state.characters.charactersSelected] : {},
        films: state.films
    }
};

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, {}),
)(CharacterDetailsModal)