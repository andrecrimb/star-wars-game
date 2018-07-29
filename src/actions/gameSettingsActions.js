import {ACTION_TYPES} from "../constants";

export const gameStartToggle = (statedBool) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.GAME_SETTINGS.STARTED,
            payload: statedBool
        })
    }
};

export const gameCompleted = (isCompletedBool) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.GAME_SETTINGS.COMPLETED,
            payload: isCompletedBool
        })
    }
};