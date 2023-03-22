import { createStore, applyMiddleware,compose } from "redux";
import rootReducer from "./reducer/index"
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__redux_devtools_extension_compose__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)),
);