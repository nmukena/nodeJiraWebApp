var store = {
    view: "Epics",
    epicView: "",
    render: 0, 
    projectId:"GTMP",
    currentRapidView: 4,
    sprintIds : [],
    currentSprintDetails : 2,
    storiesByEpics: {},
    epics: {},
    allStories: {},
    allEpics: {}, 
    fetching: true, 
    fetched: false, 
    error: null,
    }

export default function reducer(state=store, action){
    switch (action.type){
        case "RE-RENDER":
            return {...state, render:state.render+1}

        case "GET_EPIC_SUCCESS":{
            if(!state.epics[action.id]){
                return {...state, fetching: false, fetched: true, epics: {...state.epics, [action.id]: action.json}}
            }
            return {...state, fetching: false, fetched: true}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: false, fetched: true, allEpics: action.json}
        }

        case "GET_STORY_SUCCESS":{
            if(!state.allStories[action.id]){
                return {...state, fetching: false, fetched: true, allStories: {...state.allStories, [action.id]: action.json}}
            }
            return {...state, fetching: false, fetched: true}
        }

        case "GET_STORIES_EPIC_SUCCESS":{
            if(!state.storiesByEpics[action.id]){
                return {...state, fetching: false, fetched: true, storiesByEpics: {...state.storiesByEpics, [action.id]: action.json}}
            }
            return {...state, fetching: false, fetched: true}
        }

        case "DISPLAY_STORIES":{
            return {...state, view: "Stories", epicView: action.epicView}
        }

        case "DISPLAY_EPICS":{
            return {...state, view: "Epics", epicView: ""}
        }

        

        /*
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

        }
        case "GET_ISSUES_EPIC_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
        case "ERROR":{
            return {...state, fetching: false, error: action.error}
        }*/
    }
    return state;
}