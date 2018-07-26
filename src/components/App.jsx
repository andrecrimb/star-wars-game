import React, {Component} from 'react'
import IntroPage from "../pages/Intro";
import BoardPage from "../pages/Board";
import {theme} from "../style/theme";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {MuiThemeProvider} from '@material-ui/core/styles';
import ToastAlert from '../containers/ToastAlert'
import {SYSTEM_ROUTES} from '../constants'

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <ToastAlert />
                <BrowserRouter>
                    <Switch>
                        <Route exact path={SYSTEM_ROUTES.intro.routeTo} component={IntroPage} />
                        <Route exact path={SYSTEM_ROUTES.board.routeTo} component={BoardPage} />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}
export default App