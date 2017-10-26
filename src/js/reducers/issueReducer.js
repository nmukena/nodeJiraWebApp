export default function reducer(state={ 
    issueId:"", 
    json: {}, 
    fetching: true, 
    fetched: false, 
    error: null,
    }, action){
    switch (action.type){
        case "GET_ISSUE":{
            return {...state, fetching: true}
        }
        case "GET_ISSUE_REJECTED":{
            return {...state, fetching: false, error: action.error}
        }
        case "GET_ISSUE_SUCCESS":{
            return {...state, fetching: false, fetched: true, json: JSON.parse(action.json)}
        }
    }
    return state;
}