import {ACTION_TYPES} from "../constants";
import {
    fetchCharacters as fetchCharactersApi,
    fetchFromStarWarsApiUrl
} from '../services'
import {openToastAlert} from "./toastActions";
import _ from 'lodash'

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

export const selectCharacters = (characterIndex) => {
    return dispatch => {
        dispatch({
            type: ACTION_TYPES.CHARACTERS.SELECTED,
            payload: characterIndex
        });
    }
};

export const characterInteracted = (characterIndex) => {
    return (dispatch, getValues) => {
        const {
            characters: {charactersList, charactersInteracted}
        } = getValues();

        let promiseArr = [];

        let newCharacter = {
            ...charactersInteracted[characterIndex],
            name: charactersList[characterIndex].name,
            answer: '',
            points: 0,
        };

        if (_.isEmpty(charactersInteracted[characterIndex]) || _.isEmpty(charactersInteracted[characterIndex].homeworld)) {
            const planetPromise = fetchFromStarWarsApiUrl(charactersList[characterIndex].homeworld)
                .then((planet) => {
                    newCharacter = {
                        ...newCharacter,
                        homeworld: planet.data.name
                    }
                });
            promiseArr = [...promiseArr, planetPromise]
        }

        if (_.isEmpty(charactersInteracted[characterIndex]) || _.isEmpty(charactersInteracted[characterIndex].species)) {
            newCharacter = {
                ...newCharacter,
                species: [],
            };
            const speciesPromise = _.map(charactersList[characterIndex].species, specieUrl => {
                return fetchFromStarWarsApiUrl(specieUrl)
                    .then((specie) => {
                        console.log('-->',specie.data.name)
                        newCharacter = {
                            ...newCharacter,
                            species: [...newCharacter.species, specie.data.name]
                        }
                    });
            });
            promiseArr = [...promiseArr, ...speciesPromise]
        }

        if (_.isEmpty(charactersInteracted[characterIndex]) || _.isEmpty(charactersInteracted[characterIndex].vehicles)) {
            newCharacter = {
                ...newCharacter,
                vehicles: [],
            };
            const vehiclesPromise = _.map(charactersList[characterIndex].vehicles, vehicleUrl => {
                return fetchFromStarWarsApiUrl(vehicleUrl)
                    .then((vehicle) => {
                        console.log('-->',vehicle.data.name)

                        newCharacter = {
                            ...newCharacter,
                            vehicles: [...newCharacter.vehicles, vehicle.data.name]
                        }
                    });
            });
            promiseArr = [...promiseArr, ...vehiclesPromise]
        }

        if (!_.isEmpty(promiseArr)) {
            Promise.all(promiseArr)
                .then(() => {
                    dispatch({
                        type: ACTION_TYPES.CHARACTERS.INTERACTED,
                        payload: {
                            [charactersList[characterIndex].name]: {
                                ...newCharacter
                            }
                        }
                    })
                })
                .catch(() => {
                    dispatch({
                        type: ACTION_TYPES.LOADING,
                        payload: false
                    });
                    dispatch(openToastAlert('Ops... something went wrong fetching the deatils of this character'))
                });
        }
    };
};

export const characterAnswered = (realName, answeredName, characterIndex, answerCorrect) => {
    return (dispatch, getValues) => {
        const {
            characters: {charactersInteracted}
        } = getValues();

        let character = {
            name: realName,
            answer: answeredName,
            points: answerCorrect ? 5 : 0
        };

        if (_.isEmpty(charactersInteracted[characterIndex]) && answerCorrect) {
            character = {
                ...character,
                points: 10,
            }
        }

        dispatch({
            type: ACTION_TYPES.CHARACTERS.INTERACTED,
            payload: {
                [characterIndex]: {
                    ...character
                }
            }
        })
    }
};

export const clearAllAnswers = () => {
    return (dispatch, getValues) => {

        const {characters: {charactersInteracted}} = getValues();

        let charactersClean = _.map(charactersInteracted, characterItem => ({
            ...characterItem,
            answer: '',
            points: 0
        }));

        charactersClean = _.mapKeys(charactersClean, 'name');

        dispatch({
            type: ACTION_TYPES.CHARACTERS.CLEAR_ANSWERS,
            payload: charactersClean
        });
        return Promise.resolve()
    }
};