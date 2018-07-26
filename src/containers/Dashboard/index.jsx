import React, {Component} from 'react'
import {Styles} from "./styles";
import AppTopBar from "../AppTopBar";
import MenuLateral from '../MenuLateral'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Switch} from 'react-router-dom'
import {tiposUsuariosLocalStorage} from "../../services";
import {connect} from 'react-redux'
import {changeTitle} from '../../actions'
import UsuariosPage from '../../pages/Usuarios'
import TiposAcessoPage from '../../pages/TiposAcesso'
import GrandesAreasPage from '../../pages/GrandesAreas'
import SubAreasPage from '../../pages/SubAreas'
import TemasPage from '../../pages/Temas'
import HospitaisPage from '../../pages/Hospitais'
import AvaliacoesPage from '../../pages/Avaliacoes'
import MedicosPage from '../../pages/Medicos'
import PerguntasFormPage from '../../pages/PerguntasForm'
import QuestoesPage from '../../pages/Questoes'
import BateriasPage from '../../pages/Baterias'
import ProvasMedicoPage from '../../pages/CriarBateria'
import Profile from '../Profile'
import PrivateRoute from "../PrivateRoute";
import {SYSTEM_ROUTES} from "../../constants";

class Dashboard extends Component {

    componentWillMount() {
        tiposUsuariosLocalStorage();
    }

    render() {
        const {classes, theme, match, changeTitle} = this.props;

        return (
            <div className={classes.root}>
                <MenuLateral/>
                <AppTopBar/>
                <Profile/>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.usuarios.allowOnly}
                            component={UsuariosPage}
                            path={SYSTEM_ROUTES.usuarios.routeTo}
                            children={() => (changeTitle("Usuários"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.tiposAcesso.allowOnly}
                            component={TiposAcessoPage}
                            path={SYSTEM_ROUTES.tiposAcesso.routeTo}
                            // path={`${match.url}tipos-acesso`}
                            children={() => (changeTitle("Tipos de Acesso"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.grandesAreas.allowOnly}
                            component={GrandesAreasPage}
                            path={SYSTEM_ROUTES.grandesAreas.routeTo}
                            // path={`${match.url}grandes-areas`}
                            children={() => (changeTitle("Grandes Áreas"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.subAreas.allowOnly}
                            component={SubAreasPage}
                            path={SYSTEM_ROUTES.subAreas.routeTo}
                            // path={`${match.url}sub-areas`}
                            children={() => (changeTitle("Sub Áreas"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.temas.allowOnly}
                            component={TemasPage}
                            path={SYSTEM_ROUTES.temas.routeTo}
                            // path={`${match.url}temas`}
                            children={() => (changeTitle("Temas"))}/>
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.instituicao.allowOnly}
                            component={HospitaisPage}
                            path={SYSTEM_ROUTES.instituicao.routeTo}
                            // path={`${match.url}instituicoes`}
                            children={() => (changeTitle("Hospitais/Instituições"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.avaliacoes.allowOnly}
                            component={AvaliacoesPage}
                            path={SYSTEM_ROUTES.avaliacoes.routeTo}
                            // path={`${match.url}avaliacoes`}
                            children={() => (changeTitle("Avaliações"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.medicos.allowOnly}
                            component={MedicosPage}
                            path={SYSTEM_ROUTES.medicos.routeTo}
                            // path={`${match.url}medicos`}
                            children={(props) => (this.changeTitleMenu("Médicos"))}/>
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.perguntasForm.allowOnly}
                            component={PerguntasFormPage}
                            path={SYSTEM_ROUTES.perguntasForm.routeTo}
                            // path={`${match.url}perguntas-form`}
                            children={() => (changeTitle("Formulário de Perguntas"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.questoes.allowOnly}
                            component={QuestoesPage}
                            path={SYSTEM_ROUTES.questoes.routeTo}
                            // path={`${match.url}questoes`}
                            children={() => (changeTitle("Questões"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.baterias.allowOnly}
                            component={BateriasPage}
                            path={SYSTEM_ROUTES.baterias.routeTo}
                            // path={`${match.url}avaliacoes-medico`}
                            children={() => (changeTitle("Avaliações/Médico"))}
                        />
                        <PrivateRoute
                            allowOnly={SYSTEM_ROUTES.bateriaProvas.allowOnly}
                            component={ProvasMedicoPage}
                            path={SYSTEM_ROUTES.bateriaProvas.routeTo}
                            // path={`${match.url}avaliacoes-medico-provas`}
                            children={() => (changeTitle("Avaliações/Médico/Provas"))}
                        />
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.systemSettings.pageTitle
    }
};

Dashboard = connect(mapStateToProps, {changeTitle})(Dashboard);

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(Styles, {withTheme: true})(Dashboard);
