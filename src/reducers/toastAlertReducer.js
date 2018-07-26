import {ACTION_TYPES} from "../constants";

export default (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.TOAST_ALERT.OPEN_TOAST:
            return action.payload;
        case ACTION_TYPES.TOAST_ALERT.CLEAR_TOAST:
            return action.payload;
        default:
            return state;
    }
}