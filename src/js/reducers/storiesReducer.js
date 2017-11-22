var store = {
    storiesByEpics: {},
    allStories: {},
    STORY_POINTS_FIELD: "customfield_10200", 
    fetching: true, 
    fetched: false, 
    error: null,
    }

export default function reducer(state=store, action){
    switch (action.type){

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

    }
    return state;
}