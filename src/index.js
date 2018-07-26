import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,loggerMiddleware)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();