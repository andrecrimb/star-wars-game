import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import {MoreHoriz as MoreIcon} from '@material-ui/icons';
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    FormHelperText,
    Input
} from '@material-ui/core';
import {
    selectCharacters,
    characterInteracted as characterInteractedAction,
    characterAnswered,
} from "../../../../actions";
import _ from 'lodash'


class CharacterCard extends Component {

    constructor(props) {
        super(props);
        this.renderHelperText = this.renderHelperText.bind(this);
        this.sendAnswer = this.sendAnswer.bind(this);
        this.onChangeTextName = this.onChangeTextName.bind(this);
        this.state = {
            answerCorrect: null,
            hasError: null,
            textName: ''
        }
    }

    componentWillMount(){
        const {characterInteracted} = this.props;
        if(characterInteracted && !_.isEmpty(characterInteracted.answer)){
            let lastState = {
                ...this.state,
                textName: characterInteracted.answer
            };

            if(characterInteracted.points === 0){
                lastState = {
                    ...lastState,
                    answerCorrect: false,
                    hasError: true,
                }
            } else {
                lastState = {
                    ...lastState,
                    answerCorrect: true,
                    hasError: false,
                }
            }

            this.setState(lastState)
        }
    }

    onChangeTextName(value){
        this.setState({
            ...this.state,
            textName: value
        })
    }

    sendAnswer(realName, answeredName, characterIndex) {
        if (!_.isEmpty(answeredName)) {
            const answerCorrect = _.isEqual(realName.toLowerCase(), answeredName.toLowerCase());
            this.setState({
                ...this.state,
                hasError: !answerCorrect,
                answerCorrect: answerCorrect
            });
            this.props.characterAnswered(realName, answeredName, characterIndex, answerCorrect);
        }
    }

    renderHelperText() {
        if (this.state.hasError === null) {
            return null
        }
        if (this.state.hasError) {
            return (
                <FormHelperText id="name-error-text">Wrong Answer! is {this.props.character.name}</FormHelperText>
            )
        } else {
            return (
                <FormHelperText id="name-error-text">Answer Correct!</FormHelperText>
            )
        }

    }


    render() {
        const {
            classes,
            character,
            characterIndex,
            characterInteractedAction,
            selectCharacters,
            characterImage,
            onClickItem
        } = this.props;

        return (
            <Grid item sm={4} xs={12} key={characterIndex}>
                <div className={classes.container}
                     style={{background: `url(${characterImage}) top center`}}>
                    <Button
                        onClick={() => {
                            selectCharacters(characterIndex);
                            characterInteractedAction(characterIndex);
                            onClickItem()
                        }}
                        variant="fab" mini color="default"
                        aria-label="remove-image"
                        className={classes.containerButton}
                    >
                        <MoreIcon/>
                    </Button>
                    <div className={classes.inputContainer}>
                        <FormControl fullWidth error={this.state.hasError}>
                            <InputLabel htmlFor={`name-error-text_${characterIndex}`}>Name</InputLabel>
                            <Input
                                value={this.state.textName}
                                disabled={this.state.answerCorrect !== null}
                                onChange={(ev) => this.onChangeTextName(ev.target.value)}
                                onBlur={(ev) => this.sendAnswer(character.name, ev.target.value, characterIndex)}
                                id={`name-error-text_${characterIndex}`}
                            />
                            {this.renderHelperText()}
                        </FormControl>
                    </div>
                </div>
            </Grid>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        characters: state.characters,
        characterInteracted: state.characters.charactersInteracted[ownProps.characterIndex],
        characterImage: state.charactersImages[ownProps.characterIndex] ? state.charactersImages[ownProps.characterIndex] : ''
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {
        selectCharacters,
        characterAnswered,
        characterInteractedAction,
    }),
)(CharacterCard);
