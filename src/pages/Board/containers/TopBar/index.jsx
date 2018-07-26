import React, {Component} from 'react'
import {Styles} from "./styles";
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'redux'
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {environmentDev} from "../../../../environments";
import {SYSTEM_ROUTES} from "../../../../constants";

class TopBar extends Component {
    constructor(props){
        super(props);
        this.leaveTestPressed = this.leaveTestPressed.bind(this)
    }

    leaveTestPressed(){
        this.props.history.push(`${SYSTEM_ROUTES.baterias.routeTo}`)
    }

    render() {
        const {classes, avaliacoesSelected} = this.props;

        return (
            <AppBar position="absolute" className={classes.root}>
                <Toolbar classes={{root: classes.toolbar}}>
                    <img className={classes.navIcon} src={`${environmentDev.URL_BUILD}images/navbar.png`} alt=""/>
                    <Typography variant="title" className={classes.flex} color="inherit" noWrap>
                        {avaliacoesSelected.nome}
                        <p className={classes.subtitleText}>{avaliacoesSelected.hospitai ? `${avaliacoesSelected.hospitai.nome} -` : ''} {avaliacoesSelected.ano}</p>
                    </Typography>

                    <Button onClick={this.leaveTestPressed} color="inherit">
                        Sair da Prova
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    return {avaliacoesSelected: state.avaliacoes.avaliacoesSelected}
};

export default compose(
    withRouter,
    withStyles(Styles, {withTheme: true}),
    connect(mapStateToProps, {})
)(TopBar);
