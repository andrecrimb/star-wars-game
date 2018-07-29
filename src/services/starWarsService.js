import axios from 'axios'
import {URLS, SESSAO_ENUM} from "../constants";

export const fetchCharacters = (params) => {
    return axios.get(`${URLS.PEOPLE}`, {
        params: {
            ...params
        }
    })
};

export const fetchFilms = () => {
    return axios.get(`${URLS.FILMS}`, {})
};

export const fetchFromStarWarsApiUrl = (url) => {
    return axios.get(url, {})
};

export const getScoreFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(SESSAO_ENUM.GAME_SCORE));
};
export const saveScoreOnLocalStorage = (score) => {
    return new Promise(resolve => {
        const prevScores = JSON.parse(localStorage.getItem(SESSAO_ENUM.GAME_SCORE));
        const newScore = {
            ...prevScores,
            ...score
        };
        localStorage.setItem(SESSAO_ENUM.GAME_SCORE, JSON.stringify(newScore));
        resolve()
    })
};
