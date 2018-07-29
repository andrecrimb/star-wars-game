import {ACTION_TYPES} from "../constants";
import _ from 'lodash'

const initialCharactersInteracted = {
    name: '',
    answer: '',
    points: 0,
    homeworld: '',
    species: [],
    vehicles: [],
    viewed: false
};

const initial = {
    charactersList: {},
    charactersInteracted: {},
    charactersSelected: null,
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
        case ACTION_TYPES.CHARACTERS.SELECTED:
            return {
                ...state,
                charactersSelected: action.payload,
            };
        case ACTION_TYPES.CHARACTERS.INTERACTED:
            return {
                ...state,
                charactersInteracted: {
                    ...state.charactersInteracted,
                    ...action.payload
                },
            };
        case ACTION_TYPES.CHARACTERS.CLEAR_ANSWERS:
            return {
                ...state,
                charactersInteracted: action.payload,
            };
        default:
            return state
    }
}