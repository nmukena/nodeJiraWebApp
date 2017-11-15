var store = {
    view: "Epics",
    epicView: "",
    render: 0, 
    projectId:"GTMP",
    currentRapidView: 4,
    epicByTeam: {},
    epicByDate: {},
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
                console.log(action.json.issues[0]);
                var team = action.json.issues[0].fields.customfield_10500.value
                var date = action.json.issues[0].fields.customfield_10501.value
                console.log(date);
                
                if (!state.epicByTeam[team]){
                    var list = []
                    var date = []
                } else {
                    var list = state.epicByTeam[team]
                    var date = state.epicByDate[date]
                }
                return {...state, fetching: false, fetched: true, epics: {...state.epics, [action.id]: action.json},
                            epicByTeam: {...state.epicByTeam, [team]:[...list, action.json]}, 
                            epicByDate: {...state.epicByDate, [date]:[...list, action.json]}
                }
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