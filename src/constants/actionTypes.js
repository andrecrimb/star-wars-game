export const ACTION_TYPES = {
    TOAST_ALERT: {
        OPEN_TOAST: 'OPEN_TOAST',
        CLEAR_TOAST: 'CLEAR_TOAST'
    },
    GAME_SETTINGS: {
        STARTED: 'GAME_SETTINGS_STARTED',
        COMPLETED: 'GAME_SETTINGS_COMPLETED'
    },
    CHARACTERS: {
        LIST_PAGE: 'CHARACTERS_LIST_PAGE',
        LIST_LIMIT: 'CHARACTERS_LIST_LIMIT',
        CLEAR_ANSWERS: 'CHARACTERS_CLEAR_ANSWERS',
        LIST_FILTER: 'CHARACTERS_LIST_FILTER',
        SELECTED: 'CHARACTERS_SELECTED',
        ANSWERED: 'CHARACTERS_ANSWERED',
        INTERACTED: 'CHARACTERS_INTERACTED',
        INDEX: {
            REQUEST: 'CHARACTERS_INDEX_REQUEST',
            SUCCESS: 'CHARACTERS_INDEX_SUCCESS',
            FAILURE: 'CHARACTERS_INDEX_FAILURE',
        },
    },
    FILMS: {
        INDEX: {
            REQUEST: 'FILMS_INDEX_REQUEST',
            SUCCESS: 'FILMS_INDEX_SUCCESS',
            FAILURE: 'FILMS_INDEX_FAILURE',
        },
    },
    LOADING: 'LOADING_PROGRESS',
};