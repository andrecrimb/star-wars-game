import {ACTION_TYPES} from "../constants";
import {
    fetchCharacters as fetchCharactersApi,
} from '../services'
import {openToastAlert} from "./toastActions";

export const fetchCharacters = (callback) => {
    return (dispatch, getValues) => {

        const {characters: {paging}} = getValues();

        const params = {
            page: paging.page,
        };

        dispatch({
            type: ACTION_TYPES.CHARACTERS.INDEX.REQUEST,
            payload: {}
        });

        dispatch({
            type: ACTION_TYPES.LOADING,
            payload: true
        });

        fetchCharactersApi(params)
            .then(result => {
                dispatch({
                    type: ACTION_TYPES.CHARACTERS.INDEX.SUCCESS,
                    payload: {...result}
                });
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
                callback()
            })
            .catch(() => {
                dispatch({
                    type: ACTION_TYPES.LOADING,
                    payload: false
                });
                callback();
                dispatch(openToastAlert('Ops... something went wrong fetching the Characters List'))
            })
    }
};

export const changeCharactersListPage = (page) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.CHARACTERS.LIST_PAGE,
            payload: page
        });
        return Promise.resolve()
    }
};