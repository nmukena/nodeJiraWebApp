var store = {
    refreshed: 0
}

export default function reducer(state=store, action){
    switch (action.type){

        case "persist/REHYDRATE":{
            return {...state, persistedState: action.payload, refreshed: state.refreshed+1}
        }
        
    }
    return state;
}