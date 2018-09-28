import React from 'react';
import App from '../App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './../reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const middlewareAry = [
    thunk,
    createLogger()
];
const middlewares = applyMiddleware(...middlewareAry);

const store = createStore(
    rootReducer,
    middlewares
);

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;