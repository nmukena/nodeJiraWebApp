import { combineReducers } from "redux";

import epics from "./epicsReducer"
import stories from "./storiesReducer"
import views from "./viewsReducer"
import connection from "./connectionReducer"
import capacity from "./capacityReducer"
import persist from "./persistReducer"

export default combineReducers({
    epics,
    stories,
    views,
    connection,
    capacity,
    persist
})