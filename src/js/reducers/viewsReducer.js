/**
 * Views Reducer
 * Reducer responsible for maintaining the views Sub-state.
 */

/**
  * The views sub-state, that serves as controller for views.
*/ 
var store = {
    view: "Index",
    epicView: "",
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
            return {...state, view: "Index", epicView: ""}
        }

        case "GET_ALL_EPICS_ERROR":{
            return {...state, view: "Index", epicView: ""}
        }

        case "DISPLAY_STORIES":{
            return {...state, view: "Stories", epicView: action.epicView}
        }

        case "DISPLAY_EPICS":{
            return {...state, view: "Epics", epicView: ""}
        }

        case "CAPACITY_CONFIG":{
            return {...state, view: "Capacity_Config", epicView: ""}
        }
        
        case "PRIORITY_CONFIG":{
            return {...state, view: "Priority_Config", epicView: ""}
        }      
    }
    return state;
}