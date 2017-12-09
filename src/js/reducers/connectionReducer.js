var store = {
    fetching: false,
    fetched: false,
    unauthorized: false,
    unavailable: false
}

export default function reducer(state=store, action){
    switch (action.type){

        case "DISPLAY_EPICS":{
            return {...state, unauthorized: false, unavailable: false}
        }

        case "GET_ALL_EPICS":{
            return {...state, fetching: true}
        }

        case "GET_ALL_EPICS_SUCCESS":{
            return {...state, fetched: true, unauthorized: false, fetching: false, unavailable: false}
        }

        case "GET_ALL_EPICS_ERROR":{
            switch (action.code){

                case 401: {
                    return {...state, fetched: false, fetching: false, unauthorized: true }
                }

                case 404: {
                    return {...state, fetched: false, fetching: false, unavailable: true }
                }

            }
            return {...state, fetched: false }
        }
        
    }
    return state;
}