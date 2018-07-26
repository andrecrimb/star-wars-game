import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "redux";
import {connect} from "react-redux";
import CircleProgressStatus from '../../../../components/CircleProgressStatus'
import StopWatch from '../../../../components/StopWatch'
import moment from 'moment'
import {questionStopWatchChanged} from '../../../../actions'

class ProvaStatus extends Component {

    constructor(props) {
        super(props);
        this.testOverallProgress = this.testOverallProgress.bind(this);
        this.getAverageQuestionTime = this.getAverageQuestionTime.bind(this)
        this.runStopWatch = this.runStopWatch.bind(this);
        this.state = {
            stopWatchValue: 0,
            stopWatchIsRunning: false,
        }
    }

    componentWillMount() {
        this.setState({
            stopWatchValue: this.props.perguntaSelected.tempo,
            stopWatchIsRunning: true,
        });
        this.runStopWatch();

        this.getAverageQuestionTime();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.perguntaSelected.ordem !== nextProps.perguntaSelected.ordem) {
            this.setState({stopWatchIsRunning: false});
            this.props.questionStopWatchChanged(this.state.stopWatchValue, this.props.perguntaSelected.ordem);
            setTimeout(() => {
                this.setState({
                    stopWatchValue: nextProps.perguntaSelected.tempo,
                    stopWatchIsRunning: true,
                });
            }, 1000)
        }
    }

    testOverallProgress() {
        const {avaliacaoSelected: {total_perguntas, total_respostas}} = this.props;
        if (total_perguntas && total_respostas) {
            return round((total_respostas * 100) / total_perguntas)
        }
        return 0
    }

    getAverageQuestionTime() {
        const {avaliacaoSelected: {tempo, total_perguntas}} = this.props;
        const totalPerguntas = Number(total_perguntas);

        if (totalPerguntas > 0 && moment(tempo).isValid()) {
            const formatedTime = moment.duration(moment(tempo).format('HH:mm:ss')).asSeconds();
            return round(formatedTime / totalPerguntas)
        }
        return 0
    }

    runStopWatch() {
        this.setState({stopWatchValue: moment.duration(this.state.stopWatchValue, 's').asSeconds()});
        const stopWatchLoop = setInterval(() => {
            if (this.state.stopWatchIsRunning && !this.props.perguntaSelected.answered) {
                this.setState({stopWatchValue: moment.duration(this.state.stopWatchValue, 's').add(1, 's').asSeconds()});
            }
        }, 1000);
    };

    render() {
        const {classes, perguntaSelected: {tempo}} = this.props;

        return (
            <div className={classes.provaStatusFullContainer}>
                <StopWatch
                    active={this.state.stopWatchIsRunning}
                    title="Tempo nesta pergunta"
                    seconds={this.state.stopWatchValue}
                />
                <CircleProgressStatus title="Progresso" progress={this.testOverallProgress()}/>
                <StopWatch
                    active={true}
                    title="Tempo médio por pergunta"
                    seconds={this.getAverageQuestionTime()}
                />
            </div>
        )
    }
}

const round = (value, precision) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

const mapStateToProps = (state) => {
    return {
        avaliacaoSelected: state.avaliacoes.avaliacoesSelected,
        perguntaSelected: state.avaliacaoRespostas.perguntasList[state.avaliacaoRespostas.perguntaSelected],
    }
};

export default compose(
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {questionStopWatchChanged}),
)(ProvaStatus);
