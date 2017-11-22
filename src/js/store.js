import { applyMiddleware, createStore } from "redux"
import { combineReducers } from "redux";
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import epics from "./reducers/epicsReducer"
import stories from "./reducers/storiesReducer"
import views from "./reducers/viewsReducer"

import reducers from "./reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger())

export default createStore(reducers, middleware)