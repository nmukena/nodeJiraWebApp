var store = {
    view: "Index",
    epicView: "",
}

export default function reducer(state=store, action){
    switch (action.type){

        case "INDEX":{
            return {...state, view: "Index", epicView: ""}
        }

        case "DISPLAY_STORIES":{
            return {...state, view: "Stories", epicView: action.epicView}
        }

        case "DISPLAY_EPICS":{
            return {...state, view: "Epics", epicView: ""}
        }
        
    }
    return state;
}