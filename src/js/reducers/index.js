import { combineReducers } from "redux";

import epics from "./epicsReducer"
import stories from "./storiesReducer"
import views from "./viewsReducer"

export default combineReducers({
    epics,
    stories,
    views,
})