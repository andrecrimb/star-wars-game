import axios from 'axios'
import {URLS} from "../constants";

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
