var store = {
    TARGET_COMPLETION_FIELD: "",
    SCRUM_TEAM_FIELD: "",
    fetching: false,
    fetched: true,
    configured: false,
    unauthorized: false,
    unavailable: false,
    bad_request: false,
    sprint_number: 1,
    target_completions: [],
    teams: [],
    teams_capacities : {},
    projectId : ""
}

export default function reducer(state=store, action){
    switch (action.type){

        case "CHANGE_CUSTOMFIELDS":{
            return {...state, TARGET_COMPLETION_FIELD: action.target, SCRUM_TEAM_FIELD: action.team}
        }

        case "SET_PROJECT":{
            return {...state, projectId: action.id}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetching: true, fetched: false}
        }

        case "GET_EPIC_SUCCESS":{
            if (state.fetching&&state.projectId==action.json.issues[0].fields.project.key&&!state.configured){ //Check the epic belongs to the current project
                if(true){
                    var team = "Default Team"
                    if(action.json.issues[0].fields[state.SCRUM_TEAM_FIELD]){
                        var team = action.json.issues[0].fields[state.SCRUM_TEAM_FIELD].value
                    }
                    if(!state.teams.includes(team)){
                        var teams = [...state.teams, team]
                    }else{
                        var teams = state.teams
                    }                
                    teams.sort()
                    var target = "Default Sprint"
                    if(action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD]){
                        var target = action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD].value
                    }
                    if(!state.target_completions.includes(target)){
                        var target_completions = [...state.target_completions, target]
                    }else{
                        var target_completions = state.target_completions 
                    }                
                    target_completions.sort()
                    var teams_capacity = {}
                    
                    for (var i = 0; i<teams.length; i++){
                        if (!teams_capacity[teams[i]]){
                            teams_capacity[teams[i]]={}
                        } 
                        for (var j = 0; j<target_completions.length; j++){
                            if (!teams_capacity[teams[i]][target_completions[j]]){
                                teams_capacity[teams[i]][target_completions[j]]=0
                            }
                        }
                    }

                    return {...state, teams: teams, 
                        target_completions: target_completions,
                        teams_capacities: teams_capacity,
                    };
                }           
            }
            return state;
        }

        case "ENTER_TEAM_CAPACITY": {
            var teams_capacity = state.teams_capacities
            teams_capacity[action.team][action.target]=action.capacity
            return {...state, teams_capacities: teams_capacity}
        }

        case "LOAD_CAPACITY": {
            return action.capacity
        }

        case "LOG_DATABASE":{
            return {...state, configured: true}
        }

        case "LOG_DATABASE_SUCCESS":{
            return {...state, configured: true};
        }
    }
    return state;
}