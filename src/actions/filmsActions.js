import {ACTION_TYPES} from "../constants";
import {
    fetchFilms as fetchFilmsApi,
} from '../services'
import {openToastAlert} from "./toastActions";

export const fetchFilms = (callback) => {
    return (dispatch) => {

        dispatch({
            type: ACTION_TYPES.FILMS.INDEX.REQUEST,
            payload: {}
        });

        dispatch({
            type: ACTION_TYPES.LOADING,
            payload: true
        });

        fetchFilmsApi()
            .then(result => {
                dispatch({
                    type: ACTION_TYPES.FILMS.INDEX.SUCCESS,
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
                dispatch(openToastAlert('Ops... something went wrong fetching the Movies List'))
            })
    }
};