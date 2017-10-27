export default function reducer(state={ 
    projectId:"GTMP", 
    json: {issues: []}, 
    fetching: true, 
    fetched: false, 
    error: null,
    }, action){
    switch (action.type){
        case "GET_ALL_ISSUES":{
            return {...state, fetching: true}
        }
        case "GET_ALL_ISSUES_REJECTED":{
            return {...state, fetching: false, error: action.error}
        }
        case "GET_ALL_ISSUES_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: action.json}
        }
    }
    return state;
}