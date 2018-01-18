var store = {
    view: "Index",
    epicView: "",
}

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