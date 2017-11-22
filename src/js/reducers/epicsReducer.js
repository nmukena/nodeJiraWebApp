var store = {
    projectId:"GTMP",
    epicByTeam: {},
    TARGET_COMPLETION_FIELD: "customfield_10501",
    SCRUM_TEAM_FIELD: "customfield_10500",
    targetByTeam: {},
    target_completions : [],
    epics: {},
    allEpics: {}, 
    fetching: true, 
    fetched: false, 
    error: null,
    }

export default function reducer(state=store, action){
    switch (action.type){
        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: false, fetched: true, allEpics: action.json}
        }

        case "GET_EPIC_SUCCESS":{
            if(!state.epics[action.id]){
                console.log(action.json.issues[0]);
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
                return {...state, fetching: false, fetched: true, epics: {...state.epics, [action.id]: action.json},
                            epicByTeam: {...state.epicByTeam, [team]:{...list, [target]: [...epicsTarget, action.json]}}, target_completions: target_completions,
                            targetByTeam: {...state.targetByTeam, [team]:[...targets, target]}
                }           
            }
            return {...state, fetching: false, fetched: true}
        }
    }
    return state;
}