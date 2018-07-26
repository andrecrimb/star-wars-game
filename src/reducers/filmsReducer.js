import {ACTION_TYPES} from "../constants";
import _ from 'lodash'

const initial = {};

export default (state = initial, action) => {

    switch (action.type) {
        case ACTION_TYPES.FILMS.INDEX.SUCCESS:
            let {results} = action.payload.data;

            return _.mapKeys(results, 'url');
        default:
            return state
    }
}