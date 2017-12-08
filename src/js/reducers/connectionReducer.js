var store = {
    status: "Index",
    validURL: true,
    validCredentials: true,
    validProject: true,
    validCustomField: true,
}

export default function reducer(state=store, action){
    switch (action.type){

        case "INDEX":{
            return {...state, status: "Index"}
        }
        
    }
    return state;
}