var store = {
    projectId:"",
    epicByTeam: {},
    TARGET_COMPLETION_FIELD: "",
    SCRUM_TEAM_FIELD: "",
    targetByTeam: {},
    target_completions : [],
    epics: {},
    allEpics: {}, 
    fetching: false, 
    fetched: true, 
    error: null,
    }

export default function reducer(state=store, action){
    switch (action.type){

        case "DISPLAY_INDEX":{
            return {
                projectId:"",
                epicByTeam: {},
                TARGET_COMPLETION_FIELD: "",
                SCRUM_TEAM_FIELD: "",
                targetByTeam: {},
                target_completions : [],
                epics: {},
                allEpics: {}, 
                fetching: false, 
                fetched: true, 
                error: null,
            }
        }

        case "CHANGE_CUSTOMFIELDS":{
            return {...state, TARGET_COMPLETION_FIELD: action.target, SCRUM_TEAM_FIELD: action.team}
        }

        case "DISPLAY_EPICS":{
            return {...state, fetching: true, fetched: false, projectId: action.projectId}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: true, fetched: false, allEpics: action.json}
        }

        case "SET_PROJECT":{
            return {...state, projectId: action.id}
        }

        case "GET_EPIC_SUCCESS":{
            if (state.fetching&&state.projectId==action.json.issues[0].fields.project.key){ //Check the epic belongs to the current project
                if(!state.epics[action.id]){
                    var team = "No Team Assigned"
                    if(action.json.issues[0].fields[state.SCRUM_TEAM_FIELD]){
                        var team = action.json.issues[0].fields[state.SCRUM_TEAM_FIELD].value
                    }
                    var target = "No Completion Date"
                    if(action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD]){
                        var target = action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD].value
                    }
                    if(!state.target_completions.includes(target)){
                        var target_completions = [...state.target_completions, target]
                    }else{
                        var target_completions = state.target_completions 
                    }
                                    
                    target_completions.sort()
                    var list = {}
                    var epicsTarget = []
                    if (state.epicByTeam[team]){
                        var list = state.epicByTeam[team]
                        if (state.epicByTeam[team][target]){
                            var epicsTarget = state.epicByTeam[team][target]
                        }
                    } 
                    var targets = []
                    if (state.targetByTeam[team]){
                        var targets = state.targetByTeam[team]
                    }
                    return {...state, epics: {...state.epics, [action.id]: action.json},
                                epicByTeam: {...state.epicByTeam, [team]:{...list, [target]: [...epicsTarget, action.json]}}, target_completions: target_completions,
                                targetByTeam: {...state.targetByTeam, [team]:[...targets, target]}
                    }           
                }
            }
            return {...state}
        }
    }
    return state;
}