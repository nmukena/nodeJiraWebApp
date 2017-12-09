var store = {
    storiesByEpics: {},
    allStories: {},
    TARGET_COMPLETION_FIELD: "",
    SCRUM_TEAM_FIELD: "",
    storiesByTarget: {},
    fetching: true, 
    fetched: false, 
    error: null,
    }

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
            if(!state.allStories[action.id]){
                var dict = {}
                if(state.storiesByTarget[action.epicId]){
                    dict = state.storiesByTarget[action.epicId]
                }

                var target = "No Completion Date"
                if(action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD]){
                    var target = action.json.issues[0].fields[state.TARGET_COMPLETION_FIELD].value
                }

                if (!dict[target]){
                    dict[target] = []
                }
                return {...state, fetching: false, fetched: true, allStories: {...state.allStories, [action.id]: action.json},
                        storiesByTarget: {...state.storiesByTarget, [action.epicId]:{...dict, [target]: [...dict[target], action.id]}}
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