import {ACTION_TYPES} from "../constants";
import _ from 'lodash'

const initial = {
    charactersList: {},
    paging: {
        page: 1,
        count: 0,
    },
};

export default (state = initial, action) => {

    switch (action.type) {
        case ACTION_TYPES.CHARACTERS.INDEX.SUCCESS:
            let {results, count} = action.payload.data;

            return {
                ...state,
                charactersList: {..._.mapKeys(results, 'name')},
                paging: {
                    ...state.paging,
                    count: count,
                },
            };
        case ACTION_TYPES.CHARACTERS.LIST_PAGE:
            return {
                ...state,
                paging: {
                    ...state.paging,
                    page: action.payload,
                }
            };
        default:
            return state
    }
}