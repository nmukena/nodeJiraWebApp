/**
 * Priority Reducer
 * Reducer responsible for maintaining the capacity Sub-state.
 */

/**
  * The priority sub-state
*/
var store = {
    TARGET_COMPLETION_FIELD: "", // The Target Completion Date custom field
    SCRUM_TEAM_FIELD: "", // The Scrum Team custom field
    fetching: false,
    configured: false,
    in_transit: [],
    arrived: [],
    priorities: {}, // The main priority structure
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

        case "GET_ALL_EPICS": {
            // Indicate that Epics are being fetched
            return {...state, fetching: true}
        }

        case "GET_ALL_EPICS_SUCCESS": {
            // Indicate that Epics have been fetched
            return {...state, fetching: false}
        }

        case "GET_EPIC": {
            // Indicate that Epics are being fetched
            return {...state, in_transit: [...state.in_transit, action.id]}
        }

        case "GET_EPIC_SUCCESS": {
            // Sort every received Epic by Team and Target Completion
            if (state.fetching&&state.projectId==action.payload.data.issues[0].fields.key){
                //Check the epic belongs to the current project
                if(!state.priorities[action.meta.id]){
                    var epicPriority = {totalPoints:0, priority:0, list: []}
                } else {
                    var epicPriority = state.priorities[action.meta]
                }
                //Add arrived and clear transit.
                return {...state, priorities: {...state.priorities, [action.meta]: epicPriority} };

            }
            return state;
        }

        case "GET_STORIES_EPIC":{
            // Indicate that Stories are being fetched
            return {...state, fetching: true}
        }

        case "GET_STORIES_EPIC_SUCCESS":{
            return {...state, fetching: false}
        }

        case "GET_STORY":{
            if(state.in_transit.includes(action.id)||state.arrived.includes(action.id)){
                return state
            }
            return {...state, in_transit: [...state.in_transit, action.id]}
        }

        case "GET_STORY_SUCCESS": {
            // Sort every received Epic by Team and Target Completion

            if(state.arrived.includes(action.meta.id)){
                return state
            } else if (state.projectId==action.payload.data.issues[0].fields.project.key&&state.in_transit.includes(action.meta.id)){
                //Check the epic belongs to the current project
                if(!state.priorities[action.meta.epicId]){
                    var epicPriority = {totalPoints:0, priority:0, list: []}
                } else {
                    var epicPriority = state.priorities[action.meta.epicId]
                }
                if (!epicPriority.list.includes(action.meta.id)){
                    var team = "Default Team"
                    if(action.payload.data.issues[0].fields[state.SCRUM_TEAM_FIELD]){
                        var team = action.payload.data.issues[0].fields[state.SCRUM_TEAM_FIELD].value
                    }
                    if (!epicPriority[team]){
                        epicPriority[team] = 0
                    }
                    epicPriority[team] += action.payload.data.issues[0].fields.customfield_10200
                    epicPriority.totalPoints += action.payload.data.issues[0].fields.customfield_10200
                    epicPriority.list.push(action.meta.id)
                    return {...state, priorities: {...state.priorities, [action.meta.epicId]: epicPriority}};
                }
            }
            return state;
        }

        case "ENTER_EPIC_PRIORITY": {
            var priority = state.priorities
            priority[action.epic].priority = action.priority
            return {...state, priorities: priority}
        }


        case "LOAD_PRIORITY": {
            // Load the capacity stored in
            console.log(state);
            console.log(action.payload.data);
            if (Object.keys(action.payload.data.priorities).length===0){
              return state;
            }else{
              console.log('Loaded Priority')
              return action.payload.data
            }
        }

        case "LOG_PRIORITY": {
            // Save capacity
            return {...state, configured: true}
        }

        case "LOG_PRIORITY_SUCCESS": {
            // Indicate that the Capacity has been configured
            return {...state, configured: true}
        }
    }
    return state;
}
