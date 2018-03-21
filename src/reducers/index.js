/**
 * Combination of all the reducers
 */

import { combineReducers } from "redux";
import epics from "./epicsReducer"
import stories from "./storiesReducer"
import views from "./viewsReducer"
import connection from "./connectionReducer"
import capacity from "./capacityReducer"
import persist from "./persistReducer"
import priority from "./priorityReducer"

const rootReducer = combineReducers({
  epics: epics,
  stories: stories,
  views: views,
  connection: connection,
  capacity: capacity,
  priority: priority,
  persist: persist
});

export default rootReducer;
