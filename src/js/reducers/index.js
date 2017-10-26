import { combineReducers } from "redux";

import allIssues from "./getAllIssuesReducer"
import issue from "./issueReducer"

export default combineReducers({
    allIssues,
    issue,
})