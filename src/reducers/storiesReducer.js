/**
 * Stories Reducer
 * Reducer responsible for maintaining the stories Sub-state.
 */

/**
  * The stories sub-state, that stores info on stories.
*/
var store = {
    storiesByEpics: {}, // Contains story details by epics
    allStories: {}, // Contains all stories and their details
    TARGET_COMPLETION_FIELD: "",
    SCRUM_TEAM_FIELD: "",
    storiesByTarget: {}, // Stores story IDs by Epic by Target Completion Date
    fetching: true,
    fetched: false,
    error: null,
    }

/**
 * Reducer. Listens to Actions. Responds to specified Action by creating and returning a new State
 * with modified information.
 * @param {Object} state Current State
 * @param {Object} action Last Triggered Action
*/
export default function reducer(state=store, action){
    switch (action.type){

        case "DISPLAY_INDEX":{
            return {
                storiesByEpics: {},
                allStories: {},
                TARGET_COMPLETION_FIELD: "",
                SCRUM_TEAM_FIELD: "",
                storiesByTarget: {},
                fetching: true,
                fetched: false,
                error: null,
            }
        }

        case "CHANGE_CUSTOMFIELDS":{
            return {...state, TARGET_COMPLETION_FIELD: action.target, SCRUM_TEAM_FIELD: action.team}
        }

        case "GET_STORY_SUCCESS":{
            if(!state.allStories[action.meta.id]){
                var dict = {}
                if(state.storiesByTarget[action.meta.epicId]){
                    dict = state.storiesByTarget[action.meta.epicId]
                }

                var target = "No Completion Date"
                if(action.payload.data.issues[0].fields[state.TARGET_COMPLETION_FIELD]){
                    var target = action.payload.data.issues[0].fields[state.TARGET_COMPLETION_FIELD].value
                }

                if (!dict[target]){
                    dict[target] = []
                }
                return {...state, fetching: false, fetched: true, allStories: {...state.allStories, [action.meta.id]: action.payload.data},
                        storiesByTarget: {...state.storiesByTarget, [action.meta.epicId]:{...dict, [target]: [...dict[target], action.meta.id]}}
                }
            return {...state, fetching: false, fetched: true}
        }}

        case "GET_STORIES_EPIC_SUCCESS":{

            if(!state.storiesByEpics[action.id]){
                return {...state, fetching: false, fetched: true, storiesByEpics: {...state.storiesByEpics, [action.id]: action.json}}
            }
            return {...state, fetching: false, fetched: true}
        }

    }
    return state;
}
