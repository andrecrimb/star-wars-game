import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import FormTextField from "../../../../components/FormTextField";
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    DialogTitle,
    Grid,
    FormControl,
} from '@material-ui/core';
import {compose} from "redux";
import Loading from '../../../../components/LoadingTop'
import {saveScoreOnLocalStorage} from "../../../../services";
import {
    openToastAlert,
    gameCompleted as gameCompletedAction,
    clearAllAnswers
} from "../../../../actions";
import _ from 'lodash'
import {SYSTEM_ROUTES} from "../../../../constants";

class EndQuizModal extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.getScore = this.getScore.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    onSubmit(values) {
        const {
            gameCompletedAction,
            openToastAlert,
            history,
            clearAllAnswers
        } = this.props;

        return new Promise(resolve => {
            const valuesToSave = {
                [values.email]: {
                    ...values,
                    score: this.getScore()
                }
            };
            saveScoreOnLocalStorage(valuesToSave)
                .then(() => {
                    resolve();
                    gameCompletedAction(false);
                    openToastAlert('Score Saved!');
                    this.clearForm();
                    history.push(SYSTEM_ROUTES.intro.routeTo);
                    clearAllAnswers()
                })
        })
    }

    getScore() {
        const {charactersInteracted, gameCompleted} = this.props;
        let finalScore = 0;
        if (gameCompleted) {
            _.map(charactersInteracted, character => {
                finalScore += character.points || 0
            });
        }

        return finalScore
    }


    renderScore() {
        const {classes, gameCompleted} = this.props;
        if (gameCompleted) {
            return (
                <h2 className={classes.h2}><span className={classes.span}>{this.getScore()}</span> points</h2>
            )
        }
    }

    clearForm() {
        this.props.reset()
    }

    modalClose() {
        this.clearForm();
        this.props.modalClose()
    }

    render() {
        const {
            handleSubmit,
            pristine,
            submitting,
            classes,
            gameCompleted
        } = this.props;
        return (
            <Dialog
                disableEscapeKeyDown={true}
                disableBackdropClick={true}
                fullWidth
                open={gameCompleted}
                onClose={this.modalClose}
            >
                <Loading
                    display={submitting}
                    color="secondary"
                />
                <DialogTitle>Quiz Completed!</DialogTitle>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <FormControl fullWidth>
                        <DialogContent classes={{root: classes.dialogContent}}>
                            {this.renderScore()}
                            <h3 className={classes.h3}>Fill the form below to save your score</h3>
                            <Grid container spacing={24}>
                                <Field
                                    label="Name"
                                    name="name"
                                    component={FormTextField}
                                    required={true}
                                    xs={12}
                                    sm={12}
                                />
                                <Field
                                    label="E-mail"
                                    name="email"
                                    component={FormTextField}
                                    required={true}
                                    type="email"
                                    xs={12}
                                    sm={12}
                                />
                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={pristine || submitting}
                                autoFocus
                                className={classes.buttonSave}>
                                Save
                            </Button>
                        </DialogActions>
                    </FormControl>
                </form>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        charactersInteracted: state.characters.charactersInteracted,
        gameCompleted: state.gameSettings.completed
    }
};

export default compose(
    withStyles(Styles),
    connect(mapStateToProps, {
        openToastAlert,
        gameCompletedAction,
        clearAllAnswers
    }),
    reduxForm({
        form: 'EndQuizModal',
        enableReinitialize: true,
    }),
)(EndQuizModal)