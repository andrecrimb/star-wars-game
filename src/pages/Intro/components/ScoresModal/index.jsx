import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import _ from 'lodash'
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    DialogTitle,
} from '@material-ui/core';
import {compose} from "redux";
import {getScoreFromLocalStorage} from "../../../../services";

class ScoresModal extends Component {

    constructor(props) {
        super(props);
        this.renderScores = this.renderScores.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.renderScores = this.renderScores.bind(this);
    }

    modalClose() {
        this.props.modalClose()
    }

    renderScores() {
        const {classes} = this.props;
        const scores = (_.map(getScoreFromLocalStorage())).sort((a,b) => b.score - a.score);

        return _.map(scores, score => (
            <div key={score.email} className={classes.sectionDetails}>
                <h3 className={classes.sectionDetailsH3}>
                    <span>{score.name}: </span> {score.score} points
                </h3>
            </div>
        ))
    }


    render() {
        const {
            classes,
            modalOpen,
        } = this.props;
        return (
            <Dialog
                fullWidth
                open={modalOpen}
                onClose={this.modalClose}
            >
                <DialogTitle>Scores</DialogTitle>
                <DialogContent className={classes.root}>
                    <div>
                        <div className={classes.sectionInner}>
                            {this.renderScores()}
                        </div>
                    </div>
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

export default compose(
    withStyles(Styles),
)(ScoresModal)