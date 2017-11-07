var store = { 
    projectId:"GTMP",
    currentRapidView: 4,
    sprintIds : [],
    currentSprintDetails : 2,
    issuesBySprints: [],
    epics: {},
    allIssues: {},
    json: {}, 
    fetching: true, 
    fetched: false, 
    error: null,
    }

export default function reducer(state=store, action){
    switch (action.type){
        case "GET_ISSUE_SUCCESS":{
            if(!state.epics[action.id]){
                return {...state, fetching: false, fetched: true, epics: {...state.epics, [action.id]: action.json}}
            }
            return {...state, fetching: false, fetched: true}
        }
        case "GET_ALL_ISSUES_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
        case "GET_RAPIDVIEWS_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
        case "GET_ALL_SPRINTS_SUCCESS":{
            return {...state, fetching: false, fetched: true, sprintIds: action.json.sprints,
                json: action.json}
        }
        case "GET_ISSUES_SPRINT_SUCCESS":{
            return {...state, fetching: false, fetched: true, 
                currentSprintDetails: action.json.sprint,
                issuesBySprints: [...state.issuesBySprints, action.json.contents.completedIssues.concat(action.json.contents.issuesNotCompletedInCurrentSprint)],
                json: action.json}
        }
        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
        case "GET_ISSUES_EPIC_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
        case "ERROR":{
            return {...state, fetching: false, error: action.error}
        }
    }
    return state;
}