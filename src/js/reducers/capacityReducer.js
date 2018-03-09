/**
 * Capacity Reducer
 * Reducer responsible for maintaining the capacity Sub-state.
 */

/**
  * The capacity sub-state
*/ 
var store = {
    TARGET_COMPLETION_FIELD: "", // The Target Completion Date custom field
    SCRUM_TEAM_FIELD: "", // The Scrum Team custom field
    fetching: false,
    fetched: true,
    configured: false,
    unauthorized: false,
    unavailable: false,
    bad_request: false,
    target_completions: [], // The list of all Target Completion Dates
    teams: [], // The list of all the Scrum Team names
    teams_capacities : {}, /* Stores capacities by Scrum Team by Target Completion Date. 
    E.g. teams_capacities["Team A"]["Sprint 1"] holds the capacity of Team A during Sprint 1.*/
    projectId : ""
}

/**
 * Reducer. Listens to Actions. Responds to specified Action by creating and returning a new State
 * with modified information.
 * @param {Object} state Current State
 * @param {Object} action Last Triggered Action
 */
export default function reducer(state=store, action){
    switch (action.type){
        case "CHANGE_CUSTOMFIELDS": {
            // Update custom fields when "CHANGE_CUSTOMFIELDS" action is triggered.
            return {...state, TARGET_COMPLETION_FIELD: action.target, SCRUM_TEAM_FIELD: action.team}
        }

        case "SET_PROJECT": {
            // Update Project ID when "SET_PROJECT" action triggered.
            return {...state, projectId: action.id}
        }

        case "GET_ALL_EPICS_SUCCESS": {
            // Indicate that Epics are being fetched
            return {...state, fetching: true, fetched: false}
        }

        case "GET_EPIC_SUCCESS": {
            // Sort every received Epic by Team and Target Completion
            if (state.fetching&&state.projectId==action.json.issues[0].fields.project.key&&!state.configured){ 
                //Check the epic belongs to the current project
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
                    var teams_capacity = state.teams_capacities
                    
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
            // Enter a Capacity Entry for team action.team during target completion date action.target
            var teams_capacity = state.teams_capacities
            teams_capacity[action.team][action.target]=action.capacity
            return {...state, teams_capacities: teams_capacity}
        }

        case "LOAD_CAPACITY": {
            // Load the capacity stored in DB
            return action.capacity
        }

        case "LOG_DATABASE": {
            // Save capacity
            return {...state, configured: true}
        }

        case "LOG_DATABASE_SUCCESS": {
            // Indicate that the Capacity has been configured
            return {...state, configured: true}
        }
    }
    return state;
}