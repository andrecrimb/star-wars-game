import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import toastAlertReducer from './toastAlertReducer'
import charactersReducer from './charactersReducer'
import systemSettingsReducer from './systemSettingsReducer'
import filmsReducer from './filmsReducer'
import gameSettingsReducer from './gameSettingsReducer'

const rootReducer = combineReducers({
    form: formReducer,
    toastAlert: toastAlertReducer,
    characters: charactersReducer,
    films: filmsReducer,
    systemSettings: systemSettingsReducer,
    gameSettings: gameSettingsReducer,
});

export default rootReducer;