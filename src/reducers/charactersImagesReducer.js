import {ACTION_TYPES} from "../constants";
const initial = {};

export default (state = initial, action) => {

    switch (action.type) {
        case ACTION_TYPES.CHARACTERS_IMAGES.INDEX.SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}