import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootWatcher } from './sagas';

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    reducer, 
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
)

sagaMiddleware.run(rootWatcher)