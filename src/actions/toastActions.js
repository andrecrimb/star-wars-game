import {ACTION_TYPES} from "../constants";

export const openToastAlert = (message, autoHideDuration) => {
    return {
        type: ACTION_TYPES.TOAST_ALERT.OPEN_TOAST,
        payload: {
            message,
            autoHideDuration,
            open: true,
        }
    }
};

export const clearToastAlert = () => {
    return {
        type: ACTION_TYPES.TOAST_ALERT.CLEAR_TOAST,
        payload: {open: false}
    }
};
