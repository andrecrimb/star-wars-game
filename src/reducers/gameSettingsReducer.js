import {ACTION_TYPES} from "../constants";

const initial = {
    started: false,
    completed: false,
};

export default (state = initial, action) => {
    switch (action.type) {
        case ACTION_TYPES.GAME_SETTINGS.STARTED:
            return {
                ...state,
                started: action.payload
            };
        case ACTION_TYPES.GAME_SETTINGS.COMPLETED:
            return {
                ...state,
                completed: action.payload
            };
        default:
            return state
    }
}
