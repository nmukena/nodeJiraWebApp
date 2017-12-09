import { applyMiddleware, createStore, compose } from "redux"
import { combineReducers } from "redux";
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import { autoRehydrate, persistStore } from "redux-persist"
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';

import epics from "./reducers/epicsReducer"
import stories from "./reducers/storiesReducer"
import views from "./reducers/viewsReducer"

import reducers from "./reducers"

const middleware = applyMiddleware(promise(), thunk, createLogger())

let store = compose (
    middleware,
    autoRehydrate()
)(createStore)(reducers)

//export default createStore(reducers, middleware)

const epicReducerFilter = createFilter(
    'epics',
    ['projectId','SCRUM_TEAM_FIELD','TARGET_COMPLETION_FIELD'],
    ['projectId','SCRUM_TEAM_FIELD','TARGET_COMPLETION_FIELD']
  );

const storyReducerFilter = createFilter(
    'stories',
    ['SCRUM_TEAM_FIELD','TARGET_COMPLETION_FIELD'],
    ['SCRUM_TEAM_FIELD','TARGET_COMPLETION_FIELD']
);

persistStore(store,{
    transforms: [
        epicReducerFilter,
        storyReducerFilter,
    ], 
    blacklist: [
        'connection'
    ]
});

export default store